import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';
import multer from 'multer';

type JwtPayload = {
  userId: number;
  role: string;
  username: string;
};

type MemberJwtPayload = {
  userId: number;
  role: 'member';
  fullName: string;
  email: string;
};

type VisitorPayload = {
  path?: string;
  referrer?: string;
};

type RegistrationPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
};

type PrayerPayload = {
  title?: string;
  category?: string;
  scheduledFor?: string;
  content?: string;
};

type CommunityResourcePayload = {
  title?: string;
  type?: string;
  url?: string;
  description?: string;
};

type EventPayload = {
  title?: string;
  category?: string;
  eventDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  location?: string;
  details?: string;
  externalLink?: string;
  isPublished?: string;
  removeDocument?: string;
};

type GalleryPayload = {
  title?: string;
  caption?: string;
};

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, '..');

dotenv.config({ path: path.join(projectRoot, '.env') });

function resolveRuntimePath(configuredPath: string | undefined, fallbackPath: string) {
  if (!configuredPath) {
    return fallbackPath;
  }

  if (process.platform === 'win32' && configuredPath.startsWith('/') && !/^[a-zA-Z]:[\\/]/.test(configuredPath)) {
    return fallbackPath;
  }

  return path.resolve(configuredPath);
}

const dataDir = resolveRuntimePath(process.env.DATA_DIR, path.join(projectRoot, 'data'));
const uploadsDir = resolveRuntimePath(process.env.UPLOADS_DIR, path.join(projectRoot, 'uploads'));
const eventUploadsDir = path.join(uploadsDir, 'events');
const galleryUploadsDir = path.join(uploadsDir, 'gallery');
const homepageContentPath = path.join(dataDir, 'homepage-content.json');
const dbPath = path.join(dataDir, 'church.db');
const jwtSecret = process.env.JWT_SECRET || 'budapest-medhane-alem-secret';
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
const adminSessionDays = Math.min(Math.max(Number(process.env.ADMIN_SESSION_DAYS || 30), 1), 90);
const port = Number(process.env.PORT || 3000);

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(eventUploadsDir, { recursive: true });
fs.mkdirSync(galleryUploadsDir, { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    full_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    city TEXT,
    message TEXT,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'member',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approved_at TEXT
  );

  CREATE TABLE IF NOT EXISTS prayers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    scheduled_for TEXT NOT NULL,
    content TEXT NOT NULL,
    deleted_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS visitor_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_path TEXT NOT NULL,
    referrer TEXT,
    ip_address TEXT,
    user_agent TEXT,
    visited_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    method TEXT,
    path TEXT,
    status_code INTEGER,
    actor_role TEXT,
    actor_id INTEGER,
    actor_name TEXT,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS community_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('document', 'video')),
    url TEXT NOT NULL,
    description TEXT,
    created_by INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS community_access_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_by INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    event_date TEXT NOT NULL,
    event_time TEXT NOT NULL,
    event_end_time TEXT,
    is_published INTEGER NOT NULL DEFAULT 1,
    location TEXT,
    details TEXT NOT NULL,
    document_url TEXT,
    document_name TEXT,
    external_link TEXT,
    created_by INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    caption TEXT,
    media_type TEXT NOT NULL CHECK(media_type IN ('image', 'video')),
    media_url TEXT NOT NULL,
    original_name TEXT,
    created_by INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const eventColumns = db.prepare(`PRAGMA table_info(events)`).all() as Array<{ name: string }>;
if (!eventColumns.some((column) => column.name === 'event_end_time')) {
  db.exec(`ALTER TABLE events ADD COLUMN event_end_time TEXT`);
}
if (!eventColumns.some((column) => column.name === 'is_published')) {
  db.exec(`ALTER TABLE events ADD COLUMN is_published INTEGER NOT NULL DEFAULT 1`);
}

const eventStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, eventUploadsDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || '').toLowerCase();
    const baseName = path.basename(file.originalname || 'document', extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'document';
    callback(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${baseName}${extension}`);
  },
});

const uploadEventDocument = multer({
  storage: eventStorage,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const allowedExtensions = new Set(['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png']);
    const extension = path.extname(file.originalname || '').toLowerCase();

    if (!allowedExtensions.has(extension)) {
      callback(new Error('Unsupported file type. Upload PDF, Office documents, or images.'));
      return;
    }

    callback(null, true);
  },
});

const galleryStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, galleryUploadsDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || '').toLowerCase();
    const baseName = path.basename(file.originalname || 'media', extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'media';
    callback(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${baseName}${extension}`);
  },
});

const uploadGalleryMedia = multer({
  storage: galleryStorage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const allowedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
    const allowedVideoExtensions = new Set(['.mp4', '.webm', '.mov', '.m4v']);
    const extension = path.extname(file.originalname || '').toLowerCase();

    if (!allowedImageExtensions.has(extension) && !allowedVideoExtensions.has(extension)) {
      callback(new Error('Unsupported gallery file type. Upload an image or video file.'));
      return;
    }

    callback(null, true);
  },
});

const prayerColumns = db.prepare(`PRAGMA table_info(prayers)`).all() as Array<{ name: string }>;
if (!prayerColumns.some((column) => column.name === 'deleted_at')) {
  db.exec(`ALTER TABLE prayers ADD COLUMN deleted_at TEXT`);
}

const userColumns = db.prepare(`PRAGMA table_info(users)`).all() as Array<{ name: string }>;
if (!userColumns.some((column) => column.name === 'password_reset_token')) {
  db.exec(`ALTER TABLE users ADD COLUMN password_reset_token TEXT`);
}
if (!userColumns.some((column) => column.name === 'password_reset_expires')) {
  db.exec(`ALTER TABLE users ADD COLUMN password_reset_expires TEXT`);
}

const adminRecord = db
  .prepare('SELECT id, username, password_hash as passwordHash FROM users WHERE role = ? LIMIT 1')
  .get('admin') as { id: number; username: string; passwordHash: string } | undefined;

const configuredAdminPasswordHash = bcrypt.hashSync(adminPassword, 10);

if (!adminRecord) {
  db.prepare(
    `INSERT INTO users (username, full_name, email, password_hash, role, status, approved_at)
     VALUES (?, ?, ?, ?, 'admin', 'approved', CURRENT_TIMESTAMP)`
  ).run(adminUsername, 'Church Administrator', 'admin@budapest-medhanealem.local', configuredAdminPasswordHash);
} else if (adminRecord.username !== adminUsername || !bcrypt.compareSync(adminPassword, adminRecord.passwordHash)) {
  db.prepare(
    `UPDATE users
     SET username = ?,
         password_hash = ?,
         approved_at = COALESCE(approved_at, CURRENT_TIMESTAMP)
     WHERE id = ?`
  ).run(adminUsername, configuredAdminPasswordHash, adminRecord.id);
}

const prayerCount = db.prepare('SELECT COUNT(*) as count FROM prayers').get() as { count: number };
if (prayerCount.count === 0) {
  const seedPrayer = db.prepare(
    `INSERT INTO prayers (title, category, scheduled_for, content)
     VALUES (?, ?, ?, ?)`
  );
  seedPrayer.run(
    'Sunday Morning Prayer',
    'Weekly Prayer',
    'Every Sunday, 6:00 - 10:30',
    'A regular parish prayer gathering centered on liturgy, sacred readings, and community worship.'
  );
  seedPrayer.run(
    'Monthly Community Prayer',
    'Community',
    'Monthly feast and community schedule',
    'Prayer and fellowship for the faithful community and families connected to the Budapest parish.'
  );
}

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(projectRoot, 'assets')));
app.use('/uploads', express.static(uploadsDir));

const sendRootFile = (fileName: string) => (req: Request, res: Response) => {
  res.sendFile(path.join(projectRoot, fileName));
};

type HomepageContent = {
  indexHtml: string;
  scriptJs: string;
};

const readHomepageContent = (): HomepageContent => {
  const fallback: HomepageContent = {
    indexHtml: fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'),
    scriptJs: fs.readFileSync(path.join(projectRoot, 'script.js'), 'utf8'),
  };

  if (!fs.existsSync(homepageContentPath)) {
    return fallback;
  }

  try {
    const saved = JSON.parse(fs.readFileSync(homepageContentPath, 'utf8')) as Partial<HomepageContent>;
    return {
      indexHtml: typeof saved.indexHtml === 'string' && saved.indexHtml.trim() ? saved.indexHtml : fallback.indexHtml,
      scriptJs: typeof saved.scriptJs === 'string' && saved.scriptJs.trim() ? saved.scriptJs : fallback.scriptJs,
    };
  } catch {
    return fallback;
  }
};

const writeHomepageContent = (content: HomepageContent) => {
  fs.writeFileSync(homepageContentPath, JSON.stringify(content), 'utf8');
};

app.get('/', (_req: Request, res: Response) => {
  const content = readHomepageContent();
  res.type('html').send(content.indexHtml);
});
app.get('/styles.css', sendRootFile('styles.css'));
app.get('/script.js', (_req: Request, res: Response) => {
  const content = readHomepageContent();
  res.type('application/javascript').send(content.scriptJs);
});
app.get('/admin', sendRootFile('admin.html'));
app.get('/admin.js', sendRootFile('admin.js'));
app.get('/community', (_req: Request, res: Response) => {
  res.redirect('/');
});
app.get('/community.js', (_req: Request, res: Response) => {
  res.status(410).type('application/javascript').send('// community portal disabled');
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});
app.get('/login', (_req: Request, res: Response) => {
  res.redirect('/');
});
app.get('/members-dashboard', (_req: Request, res: Response) => {
  res.redirect('/');
});

const issueAdminToken = (payload: JwtPayload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: `${adminSessionDays}d` });

const issueMemberToken = (payload: MemberJwtPayload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: '14d' });

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.church_admin_session;

  if (!token) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as JwtPayload;
    if (payload.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required.' });
      return;
    }
    res.locals.admin = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Session expired or invalid.' });
  }
};

const requireMember = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.church_member_session;

  if (!token) {
    res.status(401).json({ error: 'Community login required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as MemberJwtPayload;
    if (payload.role !== 'member') {
      res.status(403).json({ error: 'Member access only.' });
      return;
    }

    const approvedMember = db
      .prepare(`SELECT id FROM users WHERE id = ? AND role = 'member' AND status = 'approved'`)
      .get(payload.userId) as { id: number } | undefined;

    if (!approvedMember) {
      res.clearCookie('church_member_session');
      res.status(403).json({ error: 'Membership is not approved.' });
      return;
    }

    res.locals.member = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Community session expired or invalid.' });
  }
};

function deleteUploadedFile(fileUrl: string | null | undefined) {
  if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
    return;
  }

  const absolutePath = path.join(projectRoot, fileUrl.replace(/^\//, '').replaceAll('/', path.sep));
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

function normalizeEventPayload(body: EventPayload) {
  return {
    title: body.title?.trim() || '',
    category: body.category?.trim() || '',
    eventDate: body.eventDate?.trim() || '',
    eventStartTime: body.eventStartTime?.trim() || '',
    eventEndTime: body.eventEndTime?.trim() || '',
    location: body.location?.trim() || '',
    details: body.details?.trim() || '',
    externalLink: body.externalLink?.trim() || '',
    isPublished: body.isPublished === 'true' || body.isPublished === 'on',
    removeDocument: body.removeDocument === 'true',
  };
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers['x-forwarded-for'];
  return Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0]?.trim()
      : req.ip;
}

function resolveActor(req: Request): { role: string; id: number | null; name: string } {
  const adminToken = req.cookies?.church_admin_session;
  if (adminToken) {
    try {
      const payload = jwt.verify(adminToken, jwtSecret) as JwtPayload;
      return { role: payload.role, id: payload.userId, name: payload.username };
    } catch {
      // Ignore invalid cookie and fallback to guest.
    }
  }

  const memberToken = req.cookies?.church_member_session;
  if (memberToken) {
    try {
      const payload = jwt.verify(memberToken, jwtSecret) as MemberJwtPayload;
      return { role: payload.role, id: payload.userId, name: payload.email };
    } catch {
      // Ignore invalid cookie and fallback to guest.
    }
  }

  return { role: 'guest', id: null, name: 'guest' };
}

function shouldLogRequest(pathname: string) {
  if (pathname.startsWith('/assets/') || pathname.startsWith('/uploads/')) {
    return false;
  }

  if (pathname === '/styles.css' || pathname === '/script.js' || pathname === '/admin.js' || pathname === '/community.js') {
    return false;
  }

  return pathname === '/' || pathname === '/admin' || pathname === '/community' || pathname === '/login' || pathname === '/members-dashboard' || pathname.startsWith('/api/');
}

function writeActivityLog(entry: {
  eventType: string;
  method?: string;
  path?: string;
  statusCode?: number;
  actorRole?: string;
  actorId?: number | null;
  actorName?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: string;
}) {
  db.prepare(
    `INSERT INTO activity_logs (event_type, method, path, status_code, actor_role, actor_id, actor_name, ip_address, user_agent, details)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    entry.eventType,
    entry.method || null,
    entry.path || null,
    entry.statusCode ?? null,
    entry.actorRole || null,
    entry.actorId ?? null,
    entry.actorName || null,
    entry.ipAddress || null,
    entry.userAgent || null,
    entry.details || null,
  );
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    if (!shouldLogRequest(req.path) || req.path === '/api/admin/logs') {
      return;
    }

    try {
      const actor = resolveActor(req);
      const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '';
      const duration = Date.now() - startedAt;
      writeActivityLog({
        eventType: req.path.startsWith('/api/') ? 'api_request' : 'page_view',
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        actorRole: actor.role,
        actorId: actor.id,
        actorName: actor.name,
        ipAddress: getClientIp(req) || '',
        userAgent,
        details: `durationMs=${duration}`,
      });
    } catch {
      // Never block requests because of logging.
    }
  });

  next();
});

app.post('/api/public/visits', (req: Request<unknown, unknown, VisitorPayload>, res: Response) => {
  const pagePath = typeof req.body.path === 'string' && req.body.path.trim() ? req.body.path.trim() : '/';
  const referrer = typeof req.body.referrer === 'string' ? req.body.referrer.trim() : '';
  const ipAddress = getClientIp(req);
  const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '';

  db.prepare(
    `INSERT INTO visitor_logs (page_path, referrer, ip_address, user_agent)
     VALUES (?, ?, ?, ?)`
  ).run(pagePath, referrer || null, ipAddress || '', userAgent);

  res.status(201).json({ ok: true });
});

app.get('/api/public/prayers', (_req: Request, res: Response) => {
  const prayers = db
    .prepare(
      `SELECT id, title, category, scheduled_for as scheduledFor, content, updated_at as updatedAt
       FROM prayers
       WHERE deleted_at IS NULL
       ORDER BY id DESC`
    )
    .all();

  const community = db
    .prepare(
      `SELECT COUNT(*) as totalMembers,
              SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approvedMembers,
              SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pendingMembers
       FROM users
       WHERE role = 'member'`
    )
    .get() as { totalMembers: number | null; approvedMembers: number | null; pendingMembers: number | null };

  res.json({
    prayers,
    stats: {
      totalMembers: community.totalMembers || 0,
      approvedMembers: community.approvedMembers || 0,
      pendingMembers: community.pendingMembers || 0,
    },
  });
});

app.get('/api/public/events', (_req: Request, res: Response) => {
  const events = db
    .prepare(
      `SELECT id,
              title,
              category,
              event_date as eventDate,
              event_time as eventStartTime,
              event_end_time as eventEndTime,
              is_published as isPublished,
              location,
              details,
              document_url as documentUrl,
              document_name as documentName,
              external_link as externalLink,
              created_at as createdAt,
              updated_at as updatedAt
       FROM events
       WHERE is_published = 1
       ORDER BY event_date ASC, event_time ASC, id DESC`
    )
    .all();

  res.json(events);
});

app.get('/api/public/gallery', (_req: Request, res: Response) => {
  const media = db
    .prepare(
      `SELECT id,
              title,
              caption,
              media_type as mediaType,
              media_url as mediaUrl,
              original_name as originalName,
              created_at as createdAt,
              updated_at as updatedAt
       FROM gallery_media
       ORDER BY created_at DESC, id DESC`
    )
    .all();

  res.json(media);
});

app.post('/api/public/registrations', (_req: Request<unknown, unknown, RegistrationPayload>, res: Response) => {
  res.status(403).json({ error: 'Member registration is disabled. Contact the administrator.' });
});

app.post('/api/admin/login', (req: Request<unknown, unknown, { username?: string; password?: string }>, res: Response) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  const admin = db
    .prepare(
      `SELECT id, username, password_hash as passwordHash, role
       FROM users
       WHERE username = ? AND role = 'admin'
       LIMIT 1`
    )
    .get(username) as { id: number; username: string; passwordHash: string; role: string } | undefined;

  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    writeActivityLog({
      eventType: 'admin_login_failed',
      method: 'POST',
      path: '/api/admin/login',
      statusCode: 401,
      actorRole: 'guest',
      actorName: username || 'unknown',
      ipAddress: getClientIp(req) || '',
      userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '',
    });
    res.status(401).json({ error: 'Invalid login.' });
    return;
  }

  const token = issueAdminToken({ userId: admin.id, role: admin.role, username: admin.username });
  res.cookie('church_admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: adminSessionDays * 24 * 60 * 60 * 1000,
  });

  writeActivityLog({
    eventType: 'admin_login_success',
    method: 'POST',
    path: '/api/admin/login',
    statusCode: 200,
    actorRole: 'admin',
    actorId: admin.id,
    actorName: admin.username,
    ipAddress: getClientIp(req) || '',
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '',
  });

  res.json({ message: 'Authenticated.', username: admin.username });
});

app.post('/api/admin/logout', (_req: Request, res: Response) => {
  res.clearCookie('church_admin_session');
  res.json({ message: 'Logged out.' });
});

app.get('/api/admin/session', requireAdmin, (_req: Request, res: Response) => {
  res.json({ authenticated: true, admin: res.locals.admin });
});

app.get('/api/admin/homepage-content', requireAdmin, (_req: Request, res: Response) => {
  try {
    res.json(readHomepageContent());
  } catch {
    res.status(500).json({ error: 'Unable to load homepage sources.' });
  }
});

app.put(
  '/api/admin/homepage-content',
  requireAdmin,
  (req: Request<unknown, unknown, { indexHtml?: string; scriptJs?: string }>, res: Response) => {
    const indexHtml = typeof req.body.indexHtml === 'string' ? req.body.indexHtml : '';
    const scriptJs = typeof req.body.scriptJs === 'string' ? req.body.scriptJs : '';

    if (!indexHtml.trim() || !scriptJs.trim()) {
      res.status(400).json({ error: 'Both index.html and script.js content are required.' });
      return;
    }

    if (indexHtml.length > 2_000_000 || scriptJs.length > 2_000_000) {
      res.status(400).json({ error: 'Submitted content is too large.' });
      return;
    }

    try {
      writeHomepageContent({ indexHtml, scriptJs });
      res.json({ message: 'Homepage content updated.' });
    } catch {
      res.status(500).json({ error: 'Failed to save homepage content.' });
    }
  }
);

app.get('/api/admin/overview', requireAdmin, (_req: Request, res: Response) => {
  const prayerStats = db
    .prepare(`SELECT
      SUM(CASE WHEN deleted_at IS NULL THEN 1 ELSE 0 END) as active,
      SUM(CASE WHEN deleted_at IS NOT NULL THEN 1 ELSE 0 END) as deleted
      FROM prayers`)
    .get() as { active: number | null; deleted: number | null };
  const registrationStats = db
    .prepare(
      `SELECT
         COUNT(*) as total,
         SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
         SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved
       FROM users
       WHERE role = 'member'`
    )
    .get() as { total: number | null; pending: number | null; approved: number | null };
  const visitorStats = db.prepare('SELECT COUNT(*) as count FROM visitor_logs').get() as { count: number };
  const resourceStats = db.prepare('SELECT COUNT(*) as count FROM community_resources').get() as { count: number };
  const eventStats = db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };
  const linkStats = db
    .prepare(
      `SELECT COUNT(*) as count
       FROM community_access_links
       WHERE used_at IS NULL AND datetime(expires_at) > datetime('now')`
    )
    .get() as { count: number };

  res.json({
    prayers: prayerStats.active || 0,
    deletedPrayers: prayerStats.deleted || 0,
    members: registrationStats.total || 0,
    pendingMembers: registrationStats.pending || 0,
    approvedMembers: registrationStats.approved || 0,
    visits: visitorStats.count,
    resources: resourceStats.count,
    events: eventStats.count,
    activeLinks: linkStats.count,
  });
});

app.get('/api/admin/members', requireAdmin, (req: Request<unknown, unknown, unknown, { status?: string }>, res: Response) => {
  const status = req.query.status?.trim() || 'approved';
  const members = db
    .prepare(
      `SELECT id, full_name as fullName, email, phone, city, status, created_at as createdAt, approved_at as approvedAt
       FROM users
       WHERE role = 'member' AND status = ?
       ORDER BY approved_at DESC, created_at DESC`
    )
    .all(status);

  res.json(members);
});

app.post('/api/admin/member-links', requireAdmin, (req: Request<unknown, unknown, { userId?: number; expiresInDays?: number }>, res: Response) => {
  const userId = Number(req.body.userId);
  const expiresInDaysRaw = Number(req.body.expiresInDays || 7);
  const expiresInDays = Number.isFinite(expiresInDaysRaw) ? Math.min(Math.max(expiresInDaysRaw, 1), 60) : 7;

  if (!userId) {
    res.status(400).json({ error: 'Valid approved member is required.' });
    return;
  }

  const member = db
    .prepare(
      `SELECT id, full_name as fullName, email
       FROM users
       WHERE id = ? AND role = 'member' AND status = 'approved'`
    )
    .get(userId) as { id: number; fullName: string; email: string } | undefined;

  if (!member) {
    res.status(404).json({ error: 'Approved member not found.' });
    return;
  }

  const token = crypto.randomBytes(24).toString('hex');
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiresInDays);

  db.prepare(
    `INSERT INTO community_access_links (user_id, token, expires_at, created_by)
     VALUES (?, ?, ?, ?)`
  ).run(member.id, token, expiryDate.toISOString(), res.locals.admin.userId);

  const linkUrl = `${req.protocol}://${req.get('host')}/community?access=${token}`;
  res.status(201).json({
    linkUrl,
    token,
    member,
    expiresAt: expiryDate.toISOString(),
  });
});

app.get('/api/admin/member-links', requireAdmin, (_req: Request, res: Response) => {
  const links = db
    .prepare(
      `SELECT l.id,
              l.token,
              l.expires_at as expiresAt,
              l.used_at as usedAt,
              l.created_at as createdAt,
              u.id as userId,
              u.full_name as fullName,
              u.email as email
       FROM community_access_links l
       JOIN users u ON u.id = l.user_id
       ORDER BY l.created_at DESC
       LIMIT 100`
    )
    .all();
  res.json(links);
});

app.get('/api/admin/resources', requireAdmin, (_req: Request, res: Response) => {
  const resources = db
    .prepare(
      `SELECT id, title, type, url, description, created_at as createdAt
       FROM community_resources
       ORDER BY created_at DESC`
    )
    .all();
  res.json(resources);
});

app.get('/api/admin/gallery', requireAdmin, (_req: Request, res: Response) => {
  const media = db
    .prepare(
      `SELECT id,
              title,
              caption,
              media_type as mediaType,
              media_url as mediaUrl,
              original_name as originalName,
              created_at as createdAt,
              updated_at as updatedAt
       FROM gallery_media
       ORDER BY created_at DESC, id DESC`
    )
    .all();

  res.json(media);
});

app.post('/api/admin/gallery', requireAdmin, uploadGalleryMedia.single('media'), (req: Request<unknown, unknown, GalleryPayload>, res: Response) => {
  const title = req.body.title?.trim();
  const caption = req.body.caption?.trim() || '';

  if (!title || !req.file) {
    if (req.file) {
      deleteUploadedFile(`/uploads/gallery/${req.file.filename}`);
    }
    res.status(400).json({ error: 'Title and media file are required.' });
    return;
  }

  const extension = path.extname(req.file.originalname || '').toLowerCase();
  const mediaType = ['.mp4', '.webm', '.mov', '.m4v'].includes(extension) ? 'video' : 'image';
  const mediaUrl = `/uploads/gallery/${req.file.filename}`;

  const result = db
    .prepare(
      `INSERT INTO gallery_media (title, caption, media_type, media_url, original_name, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(title, caption, mediaType, mediaUrl, req.file.originalname, res.locals.admin.userId);

  const record = db
    .prepare(
      `SELECT id,
              title,
              caption,
              media_type as mediaType,
              media_url as mediaUrl,
              original_name as originalName,
              created_at as createdAt,
              updated_at as updatedAt
       FROM gallery_media
       WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  res.status(201).json(record);
});

app.delete('/api/admin/gallery/:id', requireAdmin, (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const media = db
    .prepare(`SELECT media_url as mediaUrl FROM gallery_media WHERE id = ?`)
    .get(id) as { mediaUrl: string } | undefined;

  if (!media) {
    res.status(404).json({ error: 'Gallery item not found.' });
    return;
  }

  deleteUploadedFile(media.mediaUrl);
  db.prepare('DELETE FROM gallery_media WHERE id = ?').run(id);
  res.json({ message: 'Gallery item deleted.' });
});

app.post('/api/admin/resources', requireAdmin, (req: Request<unknown, unknown, CommunityResourcePayload>, res: Response) => {
  const title = req.body.title?.trim();
  const type = req.body.type === 'video' ? 'video' : req.body.type === 'document' ? 'document' : '';
  const url = req.body.url?.trim();
  const description = req.body.description?.trim() || '';

  if (!title || !type || !url) {
    res.status(400).json({ error: 'Title, type, and URL are required.' });
    return;
  }

  const result = db
    .prepare(
      `INSERT INTO community_resources (title, type, url, description, created_by)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(title, type, url, description, res.locals.admin.userId);

  const resource = db
    .prepare(
      `SELECT id, title, type, url, description, created_at as createdAt
       FROM community_resources
       WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  res.status(201).json(resource);
});

app.delete('/api/admin/resources/:id', requireAdmin, (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM community_resources WHERE id = ?').run(id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Resource not found.' });
    return;
  }

  res.json({ message: 'Resource deleted.' });
});

app.post('/api/community/auth/link', (_req: Request<unknown, unknown, { token?: string }>, res: Response) => {
  res.status(403).json({ error: 'Community portal is disabled. Contact the administrator.' });
});

app.get('/api/community/session', (_req: Request, res: Response) => {
  res.status(403).json({ error: 'Community portal is disabled. Contact the administrator.' });
});

app.post('/api/community/logout', (_req: Request, res: Response) => {
  res.status(403).json({ error: 'Community portal is disabled. Contact the administrator.' });
});

app.get('/api/community/resources', (_req: Request, res: Response) => {
  res.status(403).json({ error: 'Community portal is disabled. Contact the administrator.' });
});

app.get('/api/admin/events', requireAdmin, (_req: Request, res: Response) => {
  const events = db
    .prepare(
      `SELECT id,
              title,
              category,
              event_date as eventDate,
              event_time as eventStartTime,
              event_end_time as eventEndTime,
              is_published as isPublished,
              location,
              details,
              document_url as documentUrl,
              document_name as documentName,
              external_link as externalLink,
              created_at as createdAt,
              updated_at as updatedAt
       FROM events
       ORDER BY event_date DESC, event_time DESC, id DESC`
    )
    .all();
  res.json(events);
});

app.post('/api/admin/events', requireAdmin, uploadEventDocument.single('document'), (req: Request<unknown, unknown, EventPayload>, res: Response) => {
  const payload = normalizeEventPayload(req.body);

  if (!payload.title || !payload.category || !payload.eventDate || !payload.eventStartTime || !payload.eventEndTime || !payload.details) {
    if (req.file) {
      deleteUploadedFile(`/uploads/events/${req.file.filename}`);
    }
    res.status(400).json({ error: 'Title, category, date, start time, end time, and details are required.' });
    return;
  }

  const documentUrl = req.file ? `/uploads/events/${req.file.filename}` : null;
  const documentName = req.file ? req.file.originalname : null;

  const result = db
    .prepare(
      `INSERT INTO events (title, category, event_date, event_time, event_end_time, is_published, location, details, document_url, document_name, external_link, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      payload.title,
      payload.category,
      payload.eventDate,
      payload.eventStartTime,
      payload.eventEndTime,
      payload.isPublished ? 1 : 0,
      payload.location || null,
      payload.details,
      documentUrl,
      documentName,
      payload.externalLink || null,
      res.locals.admin.userId,
    );

  const event = db
    .prepare(
      `SELECT id,
              title,
              category,
              event_date as eventDate,
              event_time as eventStartTime,
              event_end_time as eventEndTime,
              is_published as isPublished,
              location,
              details,
              document_url as documentUrl,
              document_name as documentName,
              external_link as externalLink,
              created_at as createdAt,
              updated_at as updatedAt
       FROM events
       WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  res.status(201).json(event);
});

app.put('/api/admin/events/:id', requireAdmin, uploadEventDocument.single('document'), (req: Request<{ id: string }, unknown, EventPayload>, res: Response) => {
  const id = Number(req.params.id);
  const payload = normalizeEventPayload(req.body);

  if (!id || !payload.title || !payload.category || !payload.eventDate || !payload.eventStartTime || !payload.eventEndTime || !payload.details) {
    if (req.file) {
      deleteUploadedFile(`/uploads/events/${req.file.filename}`);
    }
    res.status(400).json({ error: 'Valid event data is required.' });
    return;
  }

  const existingEvent = db
    .prepare(
      `SELECT document_url as documentUrl, document_name as documentName
       FROM events
       WHERE id = ?`
    )
    .get(id) as { documentUrl: string | null; documentName: string | null } | undefined;

  if (!existingEvent) {
    if (req.file) {
      deleteUploadedFile(`/uploads/events/${req.file.filename}`);
    }
    res.status(404).json({ error: 'Event not found.' });
    return;
  }

  let documentUrl = existingEvent.documentUrl;
  let documentName = existingEvent.documentName;

  if (payload.removeDocument) {
    deleteUploadedFile(documentUrl);
    documentUrl = null;
    documentName = null;
  }

  if (req.file) {
    deleteUploadedFile(documentUrl);
    documentUrl = `/uploads/events/${req.file.filename}`;
    documentName = req.file.originalname;
  }

  db.prepare(
    `UPDATE events
     SET title = ?,
         category = ?,
         event_date = ?,
         event_time = ?,
         event_end_time = ?,
         is_published = ?,
         location = ?,
         details = ?,
         document_url = ?,
         document_name = ?,
         external_link = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).run(
    payload.title,
    payload.category,
    payload.eventDate,
    payload.eventStartTime,
    payload.eventEndTime,
    payload.isPublished ? 1 : 0,
    payload.location || null,
    payload.details,
    documentUrl,
    documentName,
    payload.externalLink || null,
    id,
  );

  const event = db
    .prepare(
      `SELECT id,
              title,
              category,
              event_date as eventDate,
              event_time as eventStartTime,
              event_end_time as eventEndTime,
              is_published as isPublished,
              location,
              details,
              document_url as documentUrl,
              document_name as documentName,
              external_link as externalLink,
              created_at as createdAt,
              updated_at as updatedAt
       FROM events
       WHERE id = ?`
    )
    .get(id);

  res.json(event);
});

app.delete('/api/admin/events/:id', requireAdmin, (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const event = db
    .prepare(`SELECT document_url as documentUrl FROM events WHERE id = ?`)
    .get(id) as { documentUrl: string | null } | undefined;

  if (!event) {
    res.status(404).json({ error: 'Event not found.' });
    return;
  }

  deleteUploadedFile(event.documentUrl);
  db.prepare('DELETE FROM events WHERE id = ?').run(id);
  res.json({ message: 'Event deleted.' });
});

app.patch('/api/admin/events/:id/publish', requireAdmin, (req: Request<{ id: string }, unknown, { isPublished?: boolean }>, res: Response) => {
  const id = Number(req.params.id);
  const isPublished = req.body.isPublished ? 1 : 0;

  const result = db
    .prepare(
      `UPDATE events
       SET is_published = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .run(isPublished, id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Event not found.' });
    return;
  }

  const event = db
    .prepare(
      `SELECT id,
              title,
              category,
              event_date as eventDate,
              event_time as eventStartTime,
              event_end_time as eventEndTime,
              is_published as isPublished,
              location,
              details,
              document_url as documentUrl,
              document_name as documentName,
              external_link as externalLink,
              created_at as createdAt,
              updated_at as updatedAt
       FROM events
       WHERE id = ?`
    )
    .get(id);

  res.json(event);
});

app.get('/api/admin/prayers', requireAdmin, (_req: Request, res: Response) => {
  const prayers = db
    .prepare(
      `SELECT id, title, category, scheduled_for as scheduledFor, content, created_at as createdAt, updated_at as updatedAt
       FROM prayers
       WHERE deleted_at IS NULL
       ORDER BY id DESC`
    )
    .all();
  res.json(prayers);
});

app.get('/api/admin/prayers/deleted', requireAdmin, (_req: Request, res: Response) => {
  const prayers = db
    .prepare(
      `SELECT id, title, category, scheduled_for as scheduledFor, content, updated_at as updatedAt, deleted_at as deletedAt
       FROM prayers
       WHERE deleted_at IS NOT NULL
       ORDER BY deleted_at DESC`
    )
    .all();
  res.json(prayers);
});

app.post('/api/admin/prayers', requireAdmin, (req: Request<unknown, unknown, PrayerPayload>, res: Response) => {
  const title = req.body.title?.trim();
  const category = req.body.category?.trim();
  const scheduledFor = req.body.scheduledFor?.trim();
  const content = req.body.content?.trim();

  if (!title || !category || !scheduledFor || !content) {
    res.status(400).json({ error: 'All prayer fields are required.' });
    return;
  }

  const result = db
    .prepare(
      `INSERT INTO prayers (title, category, scheduled_for, content)
       VALUES (?, ?, ?, ?)`
    )
    .run(title, category, scheduledFor, content);

  const prayer = db
    .prepare(
      `SELECT id, title, category, scheduled_for as scheduledFor, content, updated_at as updatedAt
       FROM prayers WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  res.status(201).json(prayer);
});

app.put('/api/admin/prayers/:id', requireAdmin, (req: Request<{ id: string }, unknown, PrayerPayload>, res: Response) => {
  const id = Number(req.params.id);
  const title = req.body.title?.trim();
  const category = req.body.category?.trim();
  const scheduledFor = req.body.scheduledFor?.trim();
  const content = req.body.content?.trim();

  if (!id || !title || !category || !scheduledFor || !content) {
    res.status(400).json({ error: 'Valid prayer data is required.' });
    return;
  }

  const result = db
    .prepare(
      `UPDATE prayers
       SET title = ?, category = ?, scheduled_for = ?, content = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND deleted_at IS NULL`
    )
    .run(title, category, scheduledFor, content, id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Prayer not found.' });
    return;
  }

  const prayer = db
    .prepare(
      `SELECT id, title, category, scheduled_for as scheduledFor, content, updated_at as updatedAt
       FROM prayers WHERE id = ?`
    )
    .get(id);
  res.json(prayer);
});

app.delete('/api/admin/prayers/:id', requireAdmin, (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const result = db
    .prepare(`UPDATE prayers SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`)
    .run(id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Prayer not found.' });
    return;
  }

  res.json({ message: 'Prayer moved to trash.' });
});

app.post('/api/admin/prayers/:id/restore', requireAdmin, (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const result = db
    .prepare(`UPDATE prayers SET deleted_at = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NOT NULL`)
    .run(id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Deleted prayer not found.' });
    return;
  }

  const prayer = db
    .prepare(
      `SELECT id, title, category, scheduled_for as scheduledFor, content, updated_at as updatedAt
       FROM prayers WHERE id = ?`
    )
    .get(id);

  res.json(prayer);
});

app.get('/api/admin/registrations', requireAdmin, (req: Request<unknown, unknown, unknown, { status?: string }>, res: Response) => {
  const status = req.query.status?.trim();
  const registrations = status && status !== 'all'
    ? db
        .prepare(
          `SELECT id, full_name as fullName, email, phone, city, message, status, created_at as createdAt, approved_at as approvedAt
           FROM users
           WHERE role = 'member' AND status = ?
           ORDER BY created_at DESC`
        )
        .all(status)
    : db
        .prepare(
          `SELECT id, full_name as fullName, email, phone, city, message, status, created_at as createdAt, approved_at as approvedAt
           FROM users
           WHERE role = 'member'
           ORDER BY created_at DESC`
        )
        .all();

  res.json(registrations);
});

app.patch('/api/admin/registrations/:id', requireAdmin, (req: Request<{ id: string }, unknown, { status?: string }>, res: Response) => {
  const id = Number(req.params.id);
  const status = req.body.status === 'approved'
    ? 'approved'
    : req.body.status === 'pending'
      ? 'pending'
      : 'rejected';

  const result = db
    .prepare(
      `UPDATE users
       SET status = ?, approved_at = CASE WHEN ? = 'approved' THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE id = ? AND role = 'member'`
    )
    .run(status, status, id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Registration not found.' });
    return;
  }

  const registration = db
    .prepare(
      `SELECT id, full_name as fullName, email, phone, city, message, status, created_at as createdAt, approved_at as approvedAt
       FROM users
       WHERE id = ?`
    )
    .get(id);

  writeActivityLog({
    eventType: 'registration_status_updated',
    method: 'PATCH',
    path: `/api/admin/registrations/${id}`,
    statusCode: 200,
    actorRole: 'admin',
    actorId: res.locals.admin.userId,
    actorName: res.locals.admin.username,
    ipAddress: getClientIp(req) || '',
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '',
    details: `newStatus=${status}`,
  });

  res.json(registration);
});

app.delete('/api/admin/registrations/:id', requireAdmin, (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const result = db.prepare(`DELETE FROM users WHERE id = ? AND role = 'member'`).run(id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Registration not found.' });
    return;
  }

  res.json({ message: 'Registration deleted.' });
});

// Member Authentication Routes
app.post('/api/members/register', (_req: Request<unknown, unknown, { fullName?: string; email?: string; phone?: string; city?: string; password?: string }>, res: Response) => {
  res.status(403).json({ error: 'Member registration is disabled. Contact the administrator.' });
});

app.post('/api/members/login', (_req: Request<unknown, unknown, { email?: string; password?: string }>, res: Response) => {
  res.status(403).json({ error: 'Member login is disabled. Contact the administrator.' });
});

app.post('/api/members/logout', (_req: Request, res: Response) => {
  res.status(403).json({ error: 'Member login is disabled. Contact the administrator.' });
});

app.get('/api/members/session', (_req: Request, res: Response) => {
  res.status(403).json({ error: 'Member login is disabled. Contact the administrator.' });
});

app.get('/api/members/status/:email', (req: Request<{ email: string }>, res: Response) => {
  const email = req.params.email?.trim().toLowerCase();

  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }

  const member = db
    .prepare(
      `SELECT id, status, email FROM users
       WHERE email = ? AND role = 'member'
       LIMIT 1`
    )
    .get(email) as { id: number; status: string; email: string } | undefined;

  if (!member) {
    res.status(404).json({ error: 'No registration found for this email.' });
    return;
  }

  res.json({ email: member.email, status: member.status });
});

app.post('/api/members/forgot-password', (req: Request<unknown, unknown, { email?: string }>, res: Response) => {
  const email = req.body.email?.trim().toLowerCase();

  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }

  const member = db
    .prepare(`SELECT id FROM users WHERE email = ? AND role = 'member'`)
    .get(email) as { id: number } | undefined;

  if (!member) {
    // Don't reveal if email exists (security best practice)
    res.json({ message: 'If the email exists, a reset link will be sent shortly.' });
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Valid for 1 hour

  db.prepare(
    `UPDATE users
     SET password_reset_token = ?, password_reset_expires = ?
     WHERE id = ?`
  ).run(resetToken, expiresAt.toISOString(), member.id);

  // In production, send email with reset link
  const resetUrl = `${req.protocol}://${req.get('host')}/login?reset_token=${resetToken}`;
  console.log(`Password reset link for ${email}: ${resetUrl}`);

  res.json({ message: 'If the email exists, a reset link will be sent shortly.' });
});

app.post('/api/members/reset-password', (req: Request<unknown, unknown, { token?: string; password?: string }>, res: Response) => {
  const resetToken = req.body.token?.trim();
  const password = req.body.password?.trim();

  if (!resetToken || !password || password.length < 8) {
    res.status(400).json({ error: 'Valid reset token and password (min 8 characters) are required.' });
    return;
  }

  const member = db
    .prepare(
      `SELECT id FROM users
       WHERE password_reset_token = ?
       AND password_reset_expires > datetime('now')
       AND role = 'member'`
    )
    .get(resetToken) as { id: number } | undefined;

  if (!member) {
    res.status(401).json({ error: 'Invalid or expired reset link.' });
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  db.prepare(
    `UPDATE users
     SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL
     WHERE id = ?`
  ).run(passwordHash, member.id);

  res.json({ message: 'Password reset successfully. You can now login.' });
});

app.get('/api/admin/logs', requireAdmin, (req: Request<unknown, unknown, unknown, { limit?: string }>, res: Response) => {
  const parsedLimit = Number(req.query.limit || '200');
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 1000) : 200;

  const logs = db
    .prepare(
      `SELECT *
       FROM (
         SELECT id,
                'activity' as source,
                created_at as createdAt,
                event_type as eventType,
                method,
                path,
                status_code as statusCode,
                actor_role as actorRole,
                actor_name as actorName,
                ip_address as ipAddress,
                user_agent as userAgent,
                details
         FROM activity_logs

         UNION ALL

         SELECT id,
                'visitor' as source,
                visited_at as createdAt,
                'visit' as eventType,
                'VISIT' as method,
                page_path as path,
                201 as statusCode,
                'guest' as actorRole,
                'visitor' as actorName,
                ip_address as ipAddress,
                user_agent as userAgent,
                COALESCE(referrer, '') as details
         FROM visitor_logs
       ) all_logs
       ORDER BY datetime(createdAt) DESC, id DESC
       LIMIT ?`
    )
    .all(limit);

  res.json(logs);
});

app.get('/api/admin/visitors', requireAdmin, (req: Request<unknown, unknown, unknown, { limit?: string }>, res: Response) => {
  const parsedLimit = Number(req.query.limit || '50');
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 200) : 50;
  const visitors = db
    .prepare(
      `SELECT id, page_path as pagePath, referrer, ip_address as ipAddress, user_agent as userAgent, visited_at as visitedAt
       FROM visitor_logs
       ORDER BY visited_at DESC
       LIMIT ?`
    )
    .all(limit);
  res.json(visitors);
});

app.use((req: Request, res: Response) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'Not found.' });
    return;
  }

  res.status(404).sendFile(path.join(projectRoot, 'index.html'));
});

app.listen(port, () => {
  console.log(`Church website server running on http://localhost:${port}`);
  console.log(`Admin login username: ${adminUsername}`);
  if (!process.env.ADMIN_PASSWORD) {
    console.log('Default admin password in use. Set ADMIN_PASSWORD before production deployment.');
  }
});