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
