const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function loginRequest(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Invalid email or password');
  }

  return res.json(); // { user, token }
}

export async function signupRequest({ name, email, password, role }) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Signup failed');
  }

  return res.json(); // { user, token }
}

export async function fetchCurrentUser(token) {
  const res = await fetch(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Session expired');
  return res.json();
}