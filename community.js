const gate = document.querySelector('#community-gate');
const gateFeedback = document.querySelector('#community-gate-feedback');
const dashboard = document.querySelector('#community-dashboard');
const memberLabel = document.querySelector('#community-member');
const logoutButton = document.querySelector('#community-logout');
const resourceList = document.querySelector('#community-resource-list');
const prayerList = document.querySelector('#community-prayer-list');
const eventList = document.querySelector('#community-event-list');
const galleryList = document.querySelector('#community-gallery-list');
const accessForm = document.querySelector('#community-access-form');
const accessEmail = document.querySelector('#access-email');

const requestSection = document.querySelector('#community-request-section');
const requestForm = document.querySelector('#community-request-form');
const requestEmail = document.querySelector('#request-email');
const requestFullname = document.querySelector('#request-fullname');
const requestFeedback = document.querySelector('#community-request-feedback');
const requestCancel = document.querySelector('#request-cancel');

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const hasJson = response.headers.get('content-type')?.includes('application/json');
  const payload = hasJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || 'Request failed.');
  }

  return payload;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function requestAccessByEmail(email) {
  gateFeedback.textContent = 'Verifying email and checking approval status...';
  
  const result = await api('/api/public/community/access', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  gateFeedback.textContent = '';
  return result;
}

  async function submitAccessRequest(email, fullName) {
    requestFeedback.textContent = 'Submitting your access request...';
    requestFeedback.style.color = '#000';
  
    const result = await api('/api/public/community/request-access', {
      method: 'POST',
      body: JSON.stringify({ email, fullName }),
    });

    requestFeedback.textContent = '';
    return result;
  }

  function showRequestForm(email) {
    requestSection.style.display = 'block';
    requestEmail.value = email;
    requestEmail.readOnly = true;
    requestFullname.focus();
  }

  function hideRequestForm() {
    requestSection.style.display = 'none';
    requestEmail.value = '';
    requestEmail.readOnly = false;
    requestFullname.value = '';
    requestFeedback.textContent = '';
    accessEmail.focus();
  }

async function loadDashboardContent() {
  const data = await api('/api/community/dashboard');
  const resources = Array.isArray(data.resources) ? data.resources : [];
  const prayers = Array.isArray(data.prayers) ? data.prayers : [];
  const events = Array.isArray(data.events) ? data.events : [];
  const gallery = Array.isArray(data.gallery) ? data.gallery : [];

  resourceList.innerHTML = resources.map((resource) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(resource.type)}</p>
        <h3>${escapeHtml(resource.title)}</h3>
        <p>${escapeHtml(resource.description || '')}</p>
        <p><a href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">Open resource</a></p>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No resources have been posted yet.</p>';

  prayerList.innerHTML = prayers.map((prayer) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(prayer.category)}</p>
        <h3>${escapeHtml(prayer.title)}</h3>
        <p><strong>Schedule:</strong> ${escapeHtml(prayer.scheduledFor)}</p>
        <p>${escapeHtml(prayer.content)}</p>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No prayers available yet.</p>';

  eventList.innerHTML = events.map((event) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(event.category)}</p>
        <h3>${escapeHtml(event.title)}</h3>
        <p><strong>Date:</strong> ${escapeHtml(event.eventDate)} | <strong>Time:</strong> ${escapeHtml(event.eventStartTime)} - ${escapeHtml(event.eventEndTime || 'N/A')}</p>
        <p><strong>Location:</strong> ${escapeHtml(event.location || 'Not specified')}</p>
        <p>${escapeHtml(event.details || '')}</p>
        ${event.documentUrl ? `<p><a href="${escapeHtml(event.documentUrl)}" target="_blank" rel="noreferrer">Open event document</a></p>` : ''}
        ${event.externalLink ? `<p><a href="${escapeHtml(event.externalLink)}" target="_blank" rel="noreferrer">Open event link</a></p>` : ''}
      </div>
    </article>
  `).join('') || '<p class="empty-state">No events published yet.</p>';

  galleryList.innerHTML = gallery.map((item) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(item.mediaType)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.caption || '')}</p>
        <p><a href="${escapeHtml(item.mediaUrl)}" target="_blank" rel="noreferrer">Open media</a></p>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No gallery media available yet.</p>';
}

async function init() {
  try {
    const session = await api('/api/community/session');

    gate.hidden = true;
    dashboard.hidden = false;
    memberLabel.textContent = `${session.member.fullName}`;

    await loadDashboardContent();
  } catch (error) {
    gate.hidden = false;
    dashboard.hidden = true;
  }
}

if (accessForm) {
  accessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = accessEmail.value.trim();

    if (!email) {
      gateFeedback.textContent = 'Please enter your email address.';
      gateFeedback.style.color = '#c41e3a';
      return;
    }

    try {
      await requestAccessByEmail(email);
      
      // Clear form
      accessForm.reset();
      
      // Show dashboard
      gate.hidden = true;
      dashboard.hidden = false;
      
      // Load session and resources
      const session = await api('/api/community/session');
      memberLabel.textContent = `${session.member.fullName}`;
      await loadDashboardContent();
    } catch (error) {
      gateFeedback.textContent = error instanceof Error ? error.message : 'Access denied.';
      gateFeedback.style.color = '#c41e3a';
      
        // If email not found, show request form
        if (error instanceof Error && error.message.includes('not found')) {
          showRequestForm(email);
        }
    }
  });
}

  if (requestForm) {
    requestForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = requestEmail.value.trim();
      const fullName = requestFullname.value.trim();

      if (!email || !fullName) {
        requestFeedback.textContent = 'Email and full name are required.';
        requestFeedback.style.color = '#c41e3a';
        return;
      }

      try {
        await submitAccessRequest(email, fullName);
        requestFeedback.textContent = 'Your access request has been submitted! The administrator will review it shortly.';
        requestFeedback.style.color = '#0a7e4f';
        requestForm.reset();
        setTimeout(() => hideRequestForm(), 3000);
      } catch (error) {
        requestFeedback.textContent = error instanceof Error ? error.message : 'Failed to submit request.';
        requestFeedback.style.color = '#c41e3a';
      }
    });
  }

  if (requestCancel) {
    requestCancel.addEventListener('click', hideRequestForm);
  }

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await api('/api/community/logout', { method: 'POST' });
    window.location.href = '/community';
  });
}

init();