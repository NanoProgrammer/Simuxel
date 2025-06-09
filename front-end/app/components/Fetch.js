const BASE_URL = 'https://simuxel.onrender.com/';

export async function apiFetch(path, { method = 'GET', body = null, headers = {} } = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // Incluye cookies en la solicitud
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  try {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || data?.message || `Error ${res.status}`);
    }
    return data;
  } catch (err) {
    if (!res.ok) {
      throw new Error(`Error ${res.status} - ${res.statusText}`);
    }
    throw new Error('Error desconocido');
  }
}

// Exportaciones nombradas (funciones disponibles para el front-end)

// ---------- AUTH ----------
export async function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function logout() {
  return apiFetch('/auth/logout', {
    method: 'POST',
  });
}

export async function register({ name, email, password }) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
}

// ---------- USERS ----------
export async function getAllUsers() {
  return apiFetch('/users', { method: 'GET' });
}

export async function getUserById(id) {
  return apiFetch(`/users/${id}`, { method: 'GET' });
}

export async function getUserByEmail(email) {
  return apiFetch(`/users/email/${email}`, { method: 'GET' });
}

export async function getMyUser() {
  return apiFetch('/users/me', { method: 'GET' });
}

export async function createUser(data) {
  return apiFetch('/users', {
    method: 'POST',
    body: data,
  });
}

export async function updateUser(id, data) {
  return apiFetch(`/users/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function deleteUser(id) {
  return apiFetch(`/users/${id}`, { method: 'DELETE' });
}
