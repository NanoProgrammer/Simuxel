// api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://simuxel.onrender.com';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'tu_api_key_aqui';

export async function apiFetch(path, { method = 'GET', body = null, headers = {} } = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...headers,
    },
    credentials: 'include', // incluye cookies en todas las solicitudes
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

// Función para login
export async function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

// Función para logout
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
