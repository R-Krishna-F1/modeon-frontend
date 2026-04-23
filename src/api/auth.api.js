// src/api/auth.api.js
// All functions are stubs. Replace with real Supabase / fetch calls when backend is ready.

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/auth/register
 * Creates a Supabase Auth user (email + password), sends email verification,
 * and inserts an initial row into user_profiles.
 * Returns: { user, session } or throws on error.
 */
export async function register({ email, password, displayName }) {
  console.warn('register: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/auth/login
 * Calls Supabase signInWithPassword. Returns { user, session }.
 */
export async function login({ email, password }) {
  console.warn('login: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/auth/logout
 * Calls Supabase signOut(). Invalidates the session.
 */
export async function logout() {
  console.warn('logout: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/auth/reset-password
 * Calls Supabase resetPasswordForEmail(email).
 * Sends a password-reset email with a magic link.
 */
export async function resetPassword({ email }) {
  console.warn('resetPassword: backend not connected');
  return null;
}

/**
 * TODO (Backend): initiate Supabase Microsoft OAuth 2.0 flow
 * Calls supabase.auth.signInWithOAuth({ provider: 'azure', options: { scopes: 'email' } })
 * Redirects to Microsoft login; Supabase handles the callback.
 */
export async function loginWithMicrosoft() {
  console.warn('loginWithMicrosoft: backend not connected');
  return null;
}
