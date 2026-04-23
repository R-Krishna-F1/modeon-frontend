import { create } from 'zustand';

// State: { plan, status, periodEnd }
// Derived: isPremium()
// TODO (Backend): fetch subscription status from GET /api/billing/status on app load

const useSubscriptionStore = create((set, get) => ({
  plan:      'free',   // 'free' | 'premium'
  status:    'active', // 'active' | 'cancelled' | 'past_due'
  periodEnd: null,     // ISO date string

  setPlan:   (plan)      => set({ plan }),
  setStatus: (status)    => set({ status }),
  setPeriod: (periodEnd) => set({ periodEnd }),

  /** Returns true when the user has an active premium subscription */
  isPremium: () => get().plan !== 'free' && get().status === 'active',
}));

export default useSubscriptionStore;
