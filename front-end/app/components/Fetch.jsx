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

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || 'Algo salió mal');
  }

  return res.json();
}

//// ------------------ AUTH ------------------ ////

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

export async function forgotPassword(email) {
  return apiFetch('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
}

export async function resetPassword(token, newPassword) {
  return apiFetch(`/auth/reset-password/${token}`, {
    method: 'POST',
    body: { newPassword },
  });
}

//// ------------------ USERS ------------------ ////

export async function getAllUsers() {
  return apiFetch('/users', {
    method: 'GET',
  });
}

export async function getUserById(id) {
  return apiFetch(`/users/${id}`, {
    method: 'GET',
  });
}

export async function getUserByEmail(email) {
  return apiFetch(`/users/email/${email}`, {
    method: 'GET',
  });
}

export async function getMyUser() {
  return apiFetch('/users/me', {
    method: 'GET',
  });
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
  return apiFetch(`/users/${id}`, {
    method: 'DELETE',
  });
}
