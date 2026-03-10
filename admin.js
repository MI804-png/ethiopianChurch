const authCard = document.querySelector('#admin-auth-card');
const dashboard = document.querySelector('#admin-dashboard');
const loginForm = document.querySelector('#admin-login-form');
const loginFeedback = document.querySelector('#admin-login-feedback');
const adminIdentity = document.querySelector('#admin-identity');
const logoutButton = document.querySelector('#logout-button');
const prayerForm = document.querySelector('#prayer-form');
const prayerReset = document.querySelector('#prayer-reset');
const prayerFeedback = document.querySelector('#prayer-feedback');
const prayerAdminList = document.querySelector('#prayer-admin-list');
const eventForm = document.querySelector('#event-form');
const eventReset = document.querySelector('#event-reset');
const eventNewButton = document.querySelector('#event-new-button');
const eventFeedback = document.querySelector('#event-feedback');
const eventAdminList = document.querySelector('#event-admin-list');
const eventDocumentStatus = document.querySelector('#event-document-status');
const registrationList = document.querySelector('#registration-list');
const visitorList = document.querySelector('#visitor-list');
const systemLogList = document.querySelector('#system-log-list');
const adminStats = document.querySelector('#admin-stats');
const memberLinkForm = document.querySelector('#member-link-form');
const memberLinkFeedback = document.querySelector('#member-link-feedback');
const memberSelect = document.querySelector('#member-select');
const memberLinksList = document.querySelector('#member-links-list');
const resourceForm = document.querySelector('#resource-form');
const resourceFeedback = document.querySelector('#resource-feedback');
const resourceList = document.querySelector('#resource-list');
const prayerTrashList = document.querySelector('#prayer-trash-list');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

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

function setAuthenticated(session) {
  authCard.hidden = true;
  dashboard.hidden = false;
  adminIdentity.textContent = `Signed in as ${session.admin.username}`;
}

function setLoggedOut() {
  dashboard.hidden = true;
  authCard.hidden = false;
}

function fillPrayerForm(prayer) {
  prayerForm.elements.id.value = prayer.id;
  prayerForm.elements.title.value = prayer.title;
  prayerForm.elements.category.value = prayer.category;
  prayerForm.elements.scheduledFor.value = prayer.scheduledFor;
  prayerForm.elements.content.value = prayer.content;
}

function resetPrayerForm() {
  prayerForm.reset();
  prayerForm.elements.id.value = '';
  prayerFeedback.textContent = '';
}

function attachRemoveDocumentAction() {
  const removeButton = document.querySelector('#remove-event-document');
  if (!removeButton || !eventForm || !eventDocumentStatus) {
    return;
  }

  removeButton.addEventListener('click', () => {
    eventForm.elements.removeDocument.value = 'true';
    eventDocumentStatus.textContent = 'Document will be removed when you save the event.';
  });
}

function fillEventForm(eventItem) {
  eventForm.elements.id.value = eventItem.id;
  eventForm.elements.title.value = eventItem.title;
  eventForm.elements.category.value = eventItem.category;
  eventForm.elements.eventDate.value = eventItem.eventDate;
  eventForm.elements.eventStartTime.value = eventItem.eventStartTime;
  eventForm.elements.eventEndTime.value = eventItem.eventEndTime || '';
  eventForm.elements.location.value = eventItem.location || '';
  eventForm.elements.details.value = eventItem.details;
  eventForm.elements.externalLink.value = eventItem.externalLink || '';
  eventForm.elements.isPublished.checked = Boolean(eventItem.isPublished);
  eventForm.elements.removeDocument.value = 'false';

  if (eventDocumentStatus) {
    eventDocumentStatus.innerHTML = eventItem.documentUrl
      ? `Current document: <a href="${escapeHtml(eventItem.documentUrl)}" target="_blank" rel="noreferrer">${escapeHtml(eventItem.documentName || 'Open document')}</a> <button class="button button--secondary admin-inline-button" id="remove-event-document" type="button">Remove document</button>`
      : 'No document uploaded for this event.';
  }

  const documentInput = eventForm.querySelector('input[name="document"]');
  if (documentInput) {
    documentInput.value = '';
  }

  attachRemoveDocumentAction();
}

function resetEventForm() {
  eventForm.reset();
  eventForm.elements.id.value = '';
  eventForm.elements.isPublished.checked = true;
  eventForm.elements.removeDocument.value = 'false';
  eventFeedback.textContent = '';
  if (eventDocumentStatus) {
    eventDocumentStatus.textContent = 'Optional: upload a document or add an external link.';
  }
}

function renderPrayerActions(prayer) {
  const shareText = encodeURIComponent(`${prayer.title} - ${prayer.scheduledFor}\n\n${prayer.content}`);
  const shareUrl = encodeURIComponent(`${window.location.origin}/#prayers`);

  return `
    <div class="admin-item__actions">
      <button
        class="button button--secondary admin-edit-prayer"
        type="button"
        data-id="${prayer.id}"
        data-title="${escapeHtml(prayer.title)}"
        data-category="${escapeHtml(prayer.category)}"
        data-scheduledfor="${escapeHtml(prayer.scheduledFor)}"
        data-content="${escapeHtml(prayer.content)}"
      >Edit</button>
      <button class="button button--secondary admin-delete-prayer" type="button" data-id="${prayer.id}">Delete</button>
      <a class="share-link" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noreferrer">Facebook</a>
      <a class="share-link" href="https://wa.me/?text=${shareText}%20${shareUrl}" target="_blank" rel="noreferrer">WhatsApp</a>
      <a class="share-link" href="https://t.me/share/url?url=${shareUrl}&text=${shareText}" target="_blank" rel="noreferrer">Telegram</a>
    </div>
  `;
}

async function loadOverview() {
  const stats = await api('/api/admin/overview');
  adminStats.innerHTML = `
    <article class="admin-stat"><span>Prayers</span><strong>${stats.prayers}</strong></article>
    <article class="admin-stat"><span>Deleted Prayers</span><strong>${stats.deletedPrayers}</strong></article>
    <article class="admin-stat"><span>Events</span><strong>${stats.events}</strong></article>
    <article class="admin-stat"><span>Members</span><strong>${stats.members}</strong></article>
    <article class="admin-stat"><span>Pending</span><strong>${stats.pendingMembers}</strong></article>
    <article class="admin-stat"><span>Approved</span><strong>${stats.approvedMembers}</strong></article>
    <article class="admin-stat"><span>Visits</span><strong>${stats.visits}</strong></article>
    <article class="admin-stat"><span>Resources</span><strong>${stats.resources}</strong></article>
    <article class="admin-stat"><span>Active Links</span><strong>${stats.activeLinks}</strong></article>
  `;
}

async function loadApprovedMembers() {
  if (!memberSelect) {
    return;
  }

  const members = await api('/api/admin/members?status=approved');
  memberSelect.innerHTML = members.map((member) => (
    `<option value="${member.id}">${escapeHtml(member.fullName)} (${escapeHtml(member.email)})</option>`
  )).join('');

  if (members.length === 0) {
    memberSelect.innerHTML = '<option value="">No approved members available</option>';
  }
}

async function loadMemberLinks() {
  if (!memberLinksList) {
    return;
  }

  const links = await api('/api/admin/member-links');
  memberLinksList.innerHTML = links.map((link) => {
    const fullLink = `${window.location.origin}/community?access=${link.token}`;
    const status = link.usedAt
      ? 'Used'
      : new Date(link.expiresAt).getTime() < Date.now()
        ? 'Expired'
        : 'Active';

    return `
      <article class="admin-item">
        <div>
          <p class="section-tag">${escapeHtml(status)}</p>
          <h3>${escapeHtml(link.fullName)}</h3>
          <p>${escapeHtml(link.email)}</p>
          <p>Expires: ${escapeHtml(new Date(link.expiresAt).toLocaleString())}</p>
          <p class="admin-link">${escapeHtml(fullLink)}</p>
        </div>
        <div class="admin-item__actions">
          <button class="button button--secondary copy-member-link" type="button" data-link="${escapeHtml(fullLink)}">Copy link</button>
          <a class="button button--secondary" href="${escapeHtml(fullLink)}" target="_blank" rel="noreferrer">Open</a>
        </div>
      </article>
    `;
  }).join('') || '<p class="empty-state">No community links yet.</p>';

  memberLinksList.querySelectorAll('.copy-member-link').forEach((button) => {
    button.addEventListener('click', async () => {
      const link = button.dataset.link || '';
      if (!link) {
        return;
      }
      try {
        await navigator.clipboard.writeText(link);
        button.textContent = 'Copied';
        setTimeout(() => {
          button.textContent = 'Copy link';
        }, 1800);
      } catch {
        button.textContent = 'Copy failed';
      }
    });
  });
}

async function loadResources() {
  if (!resourceList) {
    return;
  }

  const resources = await api('/api/admin/resources');
  resourceList.innerHTML = resources.map((resource) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(resource.type)}</p>
        <h3>${escapeHtml(resource.title)}</h3>
        <p>${escapeHtml(resource.description || '')}</p>
        <p><a href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">${escapeHtml(resource.url)}</a></p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--secondary delete-resource" type="button" data-id="${resource.id}">Delete</button>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No resources published yet.</p>';

  resourceList.querySelectorAll('.delete-resource').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm('Delete this resource?');
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/resources/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadResources(), loadOverview()]);
      } catch (error) {
        resourceFeedback.textContent = error instanceof Error ? error.message : 'Delete failed.';
      }
    });
  });
}

async function loadEvents() {
  if (!eventAdminList) {
    return;
  }

  const events = await api('/api/admin/events');
  eventAdminList.innerHTML = events.map((eventItem) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(eventItem.isPublished ? 'Published' : 'Draft')}</p>
        <h3>${escapeHtml(eventItem.title)}</h3>
        <p>${escapeHtml(eventItem.category)}</p>
        <p><strong>${escapeHtml(eventItem.eventDate)} ${escapeHtml(eventItem.eventStartTime)}${eventItem.eventEndTime ? ` - ${escapeHtml(eventItem.eventEndTime)}` : ''}</strong></p>
        <p>${escapeHtml(eventItem.location || 'No location provided')}</p>
        <p>${escapeHtml(eventItem.details)}</p>
        ${eventItem.documentUrl ? `<p><a href="${escapeHtml(eventItem.documentUrl)}" target="_blank" rel="noreferrer">${escapeHtml(eventItem.documentName || 'Open document')}</a></p>` : ''}
        ${eventItem.externalLink ? `<p><a href="${escapeHtml(eventItem.externalLink)}" target="_blank" rel="noreferrer">${escapeHtml(eventItem.externalLink)}</a></p>` : ''}
      </div>
      <div class="admin-item__actions">
        <button
          class="button button--secondary admin-edit-event"
          type="button"
          data-id="${eventItem.id}"
          data-title="${escapeHtml(eventItem.title)}"
          data-category="${escapeHtml(eventItem.category)}"
          data-eventdate="${escapeHtml(eventItem.eventDate)}"
          data-eventstarttime="${escapeHtml(eventItem.eventStartTime)}"
          data-eventendtime="${escapeHtml(eventItem.eventEndTime || '')}"
          data-location="${escapeHtml(eventItem.location || '')}"
          data-details="${escapeHtml(eventItem.details)}"
          data-ispublished="${eventItem.isPublished ? 'true' : 'false'}"
          data-documenturl="${escapeHtml(eventItem.documentUrl || '')}"
          data-documentname="${escapeHtml(eventItem.documentName || '')}"
          data-externallink="${escapeHtml(eventItem.externalLink || '')}"
        >Edit</button>
        <button class="button button--secondary admin-toggle-event-publish" type="button" data-id="${eventItem.id}" data-ispublished="${eventItem.isPublished ? 'true' : 'false'}">${eventItem.isPublished ? 'Hide from users' : 'Post to users'}</button>
        <button class="button button--secondary admin-delete-event" type="button" data-id="${eventItem.id}">Delete</button>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No events published yet.</p>';

  eventAdminList.querySelectorAll('.admin-edit-event').forEach((button) => {
    button.addEventListener('click', () => {
      fillEventForm({
        id: Number(button.dataset.id),
        title: button.dataset.title || '',
        category: button.dataset.category || '',
        eventDate: button.dataset.eventdate || '',
        eventStartTime: button.dataset.eventstarttime || '',
        eventEndTime: button.dataset.eventendtime || '',
        location: button.dataset.location || '',
        details: button.dataset.details || '',
        isPublished: button.dataset.ispublished === 'true',
        documentUrl: button.dataset.documenturl || '',
        documentName: button.dataset.documentname || '',
        externalLink: button.dataset.externallink || '',
      });
      eventFeedback.textContent = `Editing ${button.dataset.title || 'event'}`;
    });
  });

  eventAdminList.querySelectorAll('.admin-delete-event').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm('Delete this event?');
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/events/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadEvents(), loadOverview()]);
      } catch (error) {
        eventFeedback.textContent = error instanceof Error ? error.message : 'Delete failed.';
      }
    });
  });

  eventAdminList.querySelectorAll('.admin-toggle-event-publish').forEach((button) => {
    button.addEventListener('click', async () => {
      const nextPublishedState = button.dataset.ispublished !== 'true';

      try {
        await api(`/api/admin/events/${button.dataset.id}/publish`, {
          method: 'PATCH',
          body: JSON.stringify({ isPublished: nextPublishedState }),
        });
        await Promise.all([loadEvents(), loadOverview()]);
      } catch (error) {
        eventFeedback.textContent = error instanceof Error ? error.message : 'Publish update failed.';
      }
    });
  });
}

async function loadPrayers() {
  if (!prayerAdminList) {
    return;
  }

  const prayers = await api('/api/admin/prayers');
  prayerAdminList.innerHTML = prayers.map((prayer) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">${escapeHtml(prayer.category)}</p>
        <h3>${escapeHtml(prayer.title)}</h3>
        <p><strong>${escapeHtml(prayer.scheduledFor)}</strong></p>
        <p>${escapeHtml(prayer.content)}</p>
      </div>
      ${renderPrayerActions(prayer)}
    </article>
  `).join('') || '<p class="empty-state">No prayers are available.</p>';

  prayerAdminList.querySelectorAll('.admin-edit-prayer').forEach((button) => {
    button.addEventListener('click', () => {
      const prayer = {
        id: Number(button.dataset.id),
        title: button.dataset.title || '',
        category: button.dataset.category || '',
        scheduledFor: button.dataset.scheduledfor || '',
        content: button.dataset.content || '',
      };

      fillPrayerForm(prayer);
      prayerFeedback.textContent = `Editing ${prayer.title}`;
    });
  });

  prayerAdminList.querySelectorAll('.admin-delete-prayer').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm('Delete this prayer?');
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/prayers/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadPrayers(), loadDeletedPrayers(), loadOverview()]);
      } catch (error) {
        prayerFeedback.textContent = error instanceof Error ? error.message : 'Delete failed.';
      }
    });
  });
}

async function loadDeletedPrayers() {
  if (!prayerTrashList) {
    return;
  }

  const deletedPrayers = await api('/api/admin/prayers/deleted');

  prayerTrashList.innerHTML = deletedPrayers.map((prayer) => `
    <article class="admin-item">
      <div>
        <p class="section-tag">Deleted</p>
        <h3>${escapeHtml(prayer.title)}</h3>
        <p><strong>${escapeHtml(prayer.scheduledFor)}</strong></p>
        <p>${escapeHtml(prayer.content)}</p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--primary restore-prayer" type="button" data-id="${prayer.id}">Restore</button>
      </div>
    </article>
  `).join('') || '<p class="empty-state">Trash is empty.</p>';

  prayerTrashList.querySelectorAll('.restore-prayer').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await api(`/api/admin/prayers/${button.dataset.id}/restore`, {
          method: 'POST',
        });
        prayerFeedback.textContent = 'Prayer restored.';
        await Promise.all([loadPrayers(), loadDeletedPrayers(), loadOverview()]);
      } catch (error) {
        prayerFeedback.textContent = error instanceof Error ? error.message : 'Restore failed.';
      }
    });
  });
}

async function loadRegistrations() {
  const registrations = await api('/api/admin/registrations?status=all');
  
    // Sort pending to top
    const sorted = registrations.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0;
    });
  registrationList.innerHTML = sorted.map((registration) => `
    <article class="admin-item">
      <div>
        <p class="section-tag" style="${registration.status === 'pending' ? 'background-color: #fff3cd; color: #856404;' : registration.status === 'approved' ? 'background-color: #d4edda; color: #155724;' : 'background-color: #f8d7da; color: #721c24;'} padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; font-size: 0.85rem;">${escapeHtml(registration.status.toUpperCase())}</p>
        <h3>${escapeHtml(registration.fullName)}</h3>
        <p>${escapeHtml(registration.email)}</p>
        <p>${escapeHtml(registration.phone || 'No phone provided')}</p>
        <p>${escapeHtml(registration.city || 'No city provided')}</p>
        <p>${escapeHtml(registration.message || 'No message provided')}</p>
      </div>
      <div class="admin-item__actions">
        <button class="button button--primary admin-registration-status" type="button" data-id="${registration.id}" data-status="approved">Approve</button>
        <button class="button button--secondary admin-registration-status" type="button" data-id="${registration.id}" data-status="rejected">Reject</button>
        ${registration.status !== 'pending' ? `<button class="button button--secondary admin-registration-status" type="button" data-id="${registration.id}" data-status="pending">Undo</button>` : ''}
        <button class="button button--secondary admin-registration-delete" type="button" data-id="${registration.id}">Delete</button>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No registrations yet.</p>';

  registrationList.querySelectorAll('.admin-registration-status').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await api(`/api/admin/registrations/${button.dataset.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: button.dataset.status }),
        });
        await Promise.all([loadRegistrations(), loadOverview()]);
      } catch (error) {
        loginFeedback.textContent = error instanceof Error ? error.message : 'Status update failed.';
      }
    });
  });

  registrationList.querySelectorAll('.admin-registration-delete').forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = window.confirm('Delete this registration?');
      if (!confirmed) {
        return;
      }

      try {
        await api(`/api/admin/registrations/${button.dataset.id}`, {
          method: 'DELETE',
        });
        await Promise.all([loadRegistrations(), loadOverview()]);
      } catch (error) {
        loginFeedback.textContent = error instanceof Error ? error.message : 'Delete failed.';
      }
    });
  });
}

async function loadVisitors() {
  const visitors = await api('/api/admin/visitors?limit=50');
  visitorList.innerHTML = visitors.map((visitor) => `
    <tr>
      <td>${escapeHtml(new Date(visitor.visitedAt).toLocaleString())}</td>
      <td>${escapeHtml(visitor.pagePath)}</td>
      <td>${escapeHtml(visitor.referrer || '-')}</td>
      <td>${escapeHtml(visitor.ipAddress || '-')}</td>
      <td>${escapeHtml(visitor.userAgent || '-')}</td>
    </tr>
  `).join('') || '<tr><td colspan="5">No visit records yet.</td></tr>';
}

async function loadSystemLogs() {
  if (!systemLogList) {
    return;
  }

  const logs = await api('/api/admin/logs?limit=200');
  systemLogList.innerHTML = logs.map((log) => `
    <tr>
      <td>${escapeHtml(new Date(log.createdAt).toLocaleString())}</td>
      <td>${escapeHtml(log.source || '-')}</td>
      <td>${escapeHtml(log.eventType || '-')}</td>
      <td>${escapeHtml(`${log.actorRole || 'guest'}:${log.actorName || 'unknown'}`)}</td>
      <td>${escapeHtml(log.method || '-')}</td>
      <td>${escapeHtml(log.path || '-')}</td>
      <td>${escapeHtml(String(log.statusCode ?? '-'))}</td>
      <td>${escapeHtml(log.details || '-')}</td>
    </tr>
  `).join('') || '<tr><td colspan="8">No system log records yet.</td></tr>';
}

async function hydrateDashboard() {
  await Promise.all([
    loadOverview(),
    loadPrayers(),
    loadDeletedPrayers(),
    loadEvents(),
    loadRegistrations(),
    loadVisitors(),
    loadSystemLogs(),
    loadApprovedMembers(),
    loadMemberLinks(),
    loadResources(),
  ]);
}

if (loginForm && loginFeedback) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);

    loginFeedback.textContent = 'Signing in...';

    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const session = await api('/api/admin/session');
      setAuthenticated(session);
      loginFeedback.textContent = '';
      loginForm.reset();
      await hydrateDashboard();
    } catch (error) {
      loginFeedback.textContent = error instanceof Error ? error.message : 'Login failed.';
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST' });
    setLoggedOut();
  });
}

if (prayerForm && prayerFeedback) {
  prayerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(prayerForm);
    const id = formData.get('id');
    const payload = {
      title: formData.get('title'),
      category: formData.get('category'),
      scheduledFor: formData.get('scheduledFor'),
      content: formData.get('content'),
    };

    prayerFeedback.textContent = 'Saving prayer...';

    try {
      await api(id ? `/api/admin/prayers/${id}` : '/api/admin/prayers', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      resetPrayerForm();
      prayerFeedback.textContent = 'Prayer saved.';
      await Promise.all([loadPrayers(), loadOverview()]);
    } catch (error) {
      prayerFeedback.textContent = error instanceof Error ? error.message : 'Prayer save failed.';
    }
  });
}

if (prayerReset) {
  prayerReset.addEventListener('click', () => {
    resetPrayerForm();
  });
}

if (eventForm && eventFeedback) {
  resetEventForm();

  eventForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const id = formData.get('id');

    eventFeedback.textContent = 'Saving event...';

    try {
      const response = await fetch(id ? `/api/admin/events/${id}` : '/api/admin/events', {
        method: id ? 'PUT' : 'POST',
        credentials: 'include',
        body: formData,
      });

      const hasJson = response.headers.get('content-type')?.includes('application/json');
      const payload = hasJson ? await response.json() : null;

      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || 'Event save failed.');
      }

      resetEventForm();
      eventFeedback.textContent = 'Event saved.';
      await Promise.all([loadEvents(), loadOverview()]);
    } catch (error) {
      eventFeedback.textContent = error instanceof Error ? error.message : 'Event save failed.';
    }
  });
}

if (eventReset) {
  eventReset.addEventListener('click', () => {
    resetEventForm();
  });
}

if (eventNewButton) {
  eventNewButton.addEventListener('click', () => {
    resetEventForm();
    eventFeedback.textContent = 'Creating a new event.';
  });
}

if (memberLinkForm && memberLinkFeedback) {
  memberLinkForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(memberLinkForm);

    memberLinkFeedback.textContent = 'Generating access link...';

    try {
      const result = await api('/api/admin/member-links', {
        method: 'POST',
        body: JSON.stringify({
          userId: Number(data.get('userId')),
          expiresInDays: Number(data.get('expiresInDays')),
        }),
      });

      memberLinkFeedback.textContent = `Link created for ${result.member.fullName}`;
      await Promise.all([loadMemberLinks(), loadOverview()]);
    } catch (error) {
      memberLinkFeedback.textContent = error instanceof Error ? error.message : 'Failed to generate link.';
    }
  });
}

if (resourceForm && resourceFeedback) {
  resourceForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(resourceForm);

    resourceFeedback.textContent = 'Publishing resource...';

    try {
      await api('/api/admin/resources', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      resourceFeedback.textContent = 'Resource published.';
      resourceForm.reset();
      await Promise.all([loadResources(), loadOverview()]);
    } catch (error) {
      resourceFeedback.textContent = error instanceof Error ? error.message : 'Resource publish failed.';
    }
  });
}

(async function init() {
  try {
    const session = await api('/api/admin/session');
    setAuthenticated(session);
    await hydrateDashboard();
  } catch {
    setLoggedOut();
  }
})();