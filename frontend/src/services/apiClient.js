const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function getStoredSession() {
  try {
    const raw = localStorage.getItem('supabase_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  const session = getStoredSession();
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }
  return {};
}

function clearSession() {
  localStorage.removeItem('supabase_session');
}

function storeSession(session) {
  if (session) {
    localStorage.setItem('supabase_session', JSON.stringify(session));
  }
}

async function handleResponse(response) {
  const json = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
    }
    throw new ApiError(
      response.status,
      json.error?.message || json.message || `Request failed: ${response.status}`,
      json
    );
  }
  return json.success !== false ? json.data ?? json : json;
}

export const apiClient = {
  async get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  async post(endpoint, body) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async put(endpoint, body) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async delete(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Auth-specific helpers
  auth: {
    async signup(email, password) {
      const data = await apiClient.post('/auth/signup', { email, password });
      if (data.session) {
        storeSession(data.session);
      }
      return data;
    },

    async login(email, password) {
      const data = await apiClient.post('/auth/login', { email, password });
      if (data.session) {
        storeSession(data.session);
      }
      return data;
    },

    async logout() {
      try {
        await apiClient.post('/auth/logout', {});
      } catch {
        // ignore errors during logout
      }
      clearSession();
    },

    async me() {
      return apiClient.get('/auth/me');
    },

    getSession() {
      return getStoredSession();
    },

    isAuthenticated() {
      return !!getStoredSession()?.access_token;
    },
  },
};

export default apiClient;
