// src/hooks/useSubscription.js

import { useQuery } from '@tanstack/react-query';
import { getBillingStatus } from '@/api/billing.api';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

export function useSubscription() {
  const { plan, isPremium, setPlan, setStatus, setPeriod } = useSubscriptionStore();

  useQuery({
    queryKey: ['billingStatus'],
    queryFn:  getBillingStatus,
    onSuccess: (data) => {
      if (data) {
        setPlan(data.plan);
        setStatus(data.status);
        setPeriod(data.period_end);
      }
    },
  });

  return { plan, isPremium: isPremium() };
}
