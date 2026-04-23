import { create } from 'zustand';

// State: { user, session, isAuthenticated }
// Actions: setUser, setSession, clearAuth
// TODO (Backend): wire setSession to Supabase Auth onAuthStateChange listener in main.jsx

const useAuthStore = create((set) => ({
  user:            null,
  session:         null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setSession: (session) =>
    set({
      session,
      user:            session?.user ?? null,
      isAuthenticated: !!session?.user,
    }),

  clearAuth: () =>
    set({ user: null, session: null, isAuthenticated: false }),
}));

export default useAuthStore;
