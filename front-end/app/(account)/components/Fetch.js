const BASE_URL = 'https://simuxel.onrender.com';

export async function apiFetch(path, { method = 'GET', body = null, headers = {} } = {}) {
  // Extrae token desde cookie si existe (opcional para fallback)
  const token = typeof document !== 'undefined'
    ? document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]
    : null;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: 'include', // Enviar cookies si están disponibles
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      `Error ${res.status} - ${res.statusText}`;

    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
}
export async function login(email, password) {
  return await apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function logout() {
  return await apiFetch('/auth/logout', {
    method: 'POST',
  });
}

export async function register({ name, email, password }) {
  return await apiFetch('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
}
export async function getMyUser() {
  return await apiFetch('/users/me', { method: 'GET' });
}

export async function getAllUsers() {
  return await apiFetch('/users', { method: 'GET' });
}

export async function getUserById(id) {
  return await apiFetch(`/users/${id}`, { method: 'GET' });
}

export async function getUserByEmail(email) {
  return await apiFetch(`/users/email/${email}`, { method: 'GET' });
}

export async function createUser(data) {
  return await apiFetch('/users', {
    method: 'POST',
    body: data,
  });
}

export async function updateUser(id, data) {
  return await apiFetch(`/users/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function deleteUser(id) {
  return await apiFetch(`/users/${id}`, { method: 'DELETE' });
}
