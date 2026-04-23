// src/components/subscription/BillingPortalButton.jsx
import { ExternalLink } from 'lucide-react';
import useUIStore       from '@/stores/useUIStore';
// TODO (Backend): POST /api/billing/portal — create Stripe Customer Portal session; redirect user

export function BillingPortalButton() {
  const addToast = useUIStore((s) => s.addToast);

  const handleClick = () => {
    // TODO (Backend): POST /api/billing/portal
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  return (
    <button onClick={handleClick} className="btn-secondary" aria-label="Manage billing in Stripe portal">
      <ExternalLink size={15} /> Manage Billing
    </button>
  );
}
