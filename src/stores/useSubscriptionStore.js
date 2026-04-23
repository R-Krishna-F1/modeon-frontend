import { create } from 'zustand';

// All features are open-source / unlocked. No subscription tiers.
const useSubscriptionStore = create((set, get) => ({
  plan:      'open',
  status:    'active',
  periodEnd: null,

  setPlan:   (plan)      => set({ plan }),
  setStatus: (status)    => set({ status }),
  setPeriod: (periodEnd) => set({ periodEnd }),

  // Always returns true — all features are available to everyone
  isPremium: () => true,
}));

export default useSubscriptionStore;
