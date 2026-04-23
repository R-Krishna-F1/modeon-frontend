// src/hooks/useAuth.js
// Wraps Supabase Auth helpers. Replace stub calls with real supabase.auth.* methods.

import { useCallback } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import useUIStore from '@/stores/useUIStore';
import { login, logout, register, loginWithMicrosoft, resetPassword } from '@/api/auth.api';
import { trackEvent } from '@/lib/posthog';

export function useAuth() {
  const { user, session, isAuthenticated, setUser, setSession, clearAuth } = useAuthStore();
  const addToast = useUIStore((s) => s.addToast);

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      // TODO (Backend): replace stub with supabase.auth.signInWithPassword({ email, password })
      const result = await login({ email, password });
      if (result?.session) {
        setSession(result.session);
        // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
        trackEvent('user_logged_in', { method: 'email' });
      }
      return result;
    } catch (err) {
      addToast({ type: 'error', message: err.message || 'Login failed' });
      throw err;
    }
  }, [setSession, addToast]);

  const handleRegister = useCallback(async ({ email, password, displayName }) => {
    try {
      const result = await register({ email, password, displayName });
      // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
      trackEvent('user_registered', { method: 'email' });
      return result;
    } catch (err) {
      addToast({ type: 'error', message: err.message || 'Registration failed' });
      throw err;
    }
  }, [addToast]);

  const handleLogout = useCallback(async () => {
    await logout();
    clearAuth();
  }, [clearAuth]);

  const handleMicrosoftLogin = useCallback(async () => {
    // TODO (Backend): initiate Supabase Microsoft OAuth 2.0 flow
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    await loginWithMicrosoft();
  }, [addToast]);

  const handleResetPassword = useCallback(async ({ email }) => {
    await resetPassword({ email });
    addToast({ type: 'success', message: 'Password reset email sent!' });
  }, [addToast]);

  return {
    user,
    session,
    isAuthenticated,
    login:          handleLogin,
    register:       handleRegister,
    logout:         handleLogout,
    loginMicrosoft: handleMicrosoftLogin,
    resetPassword:  handleResetPassword,
  };
}
