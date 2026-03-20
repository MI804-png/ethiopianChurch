const gate = document.querySelector('#community-gate');
const gateFeedback = document.querySelector('#community-gate-feedback');
const dashboard = document.querySelector('#community-dashboard');
const memberLabel = document.querySelector('#community-member');
const logoutButton = document.querySelector('#community-logout');
const resourceList = document.querySelector('#community-resource-list');
const accessForm = document.querySelector('#community-access-form');
const accessEmail = document.querySelector('#access-email');

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
    const session = await api('/api/community/session');

    gate.hidden = true;
    dashboard.hidden = false;
    memberLabel.textContent = `${session.member.fullName}`;

    await loadResources();
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
      await loadResources();
    } catch (error) {
      gateFeedback.textContent = error instanceof Error ? error.message : 'Access denied.';
      gateFeedback.style.color = '#c41e3a';
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await api('/api/community/logout', { method: 'POST' });
    window.location.href = '/community';
  });
}

init();