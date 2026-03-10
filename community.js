const gate = document.querySelector('#community-gate');
const gateFeedback = document.querySelector('#community-gate-feedback');
const dashboard = document.querySelector('#community-dashboard');
const memberLabel = document.querySelector('#community-member');
const logoutButton = document.querySelector('#community-logout');
const resourceList = document.querySelector('#community-resource-list');

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

async function consumeAccessLinkIfPresent() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('access');

  if (!token) {
    return;
  }

  gateFeedback.textContent = 'Validating community access link...';
  await api('/api/community/auth/link', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  params.delete('access');
  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
  window.history.replaceState({}, '', nextUrl);
}

async function loadResources() {
  const resources = await api('/api/community/resources');
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
}

async function init() {
  try {
    await consumeAccessLinkIfPresent();
    const session = await api('/api/community/session');

    gate.hidden = true;
    dashboard.hidden = false;
    memberLabel.textContent = `${session.member.fullName}`;

    await loadResources();
  } catch (error) {
    gate.hidden = false;
    dashboard.hidden = true;
    gateFeedback.textContent = error instanceof Error
      ? error.message
      : 'Community access is restricted to approved members.';
  }
}

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await api('/api/community/logout', { method: 'POST' });
    window.location.href = '/community';
  });
}

init();