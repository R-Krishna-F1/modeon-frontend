// src/components/ui/PremiumLock.jsx
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { trackEvent } from '@/lib/posthog';

export default function PremiumLock({ children, isPremium, featureName = 'this feature' }) {
  const navigate = useNavigate();

  if (isPremium) return children;

  const handleUpgrade = () => {
    // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
    trackEvent('feature_gate_hit', { feature: featureName });
    navigate(ROUTES.PRICING);
  };

  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="pointer-events-none select-none blur-sm opacity-50" aria-hidden="true">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-canvas/60 backdrop-blur-[2px] rounded-card">
        <div className="card text-center max-w-sm p-10 flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-gold">
            <Crown size={28} color="white" />
          </div>
          <div>
            <h3 className="font-display text-2xl mb-2">Premium Feature</h3>
            <p className="text-muted text-sm leading-relaxed">
              Unlock <strong>{featureName}</strong> and everything else in Modeon Premium.
            </p>
          </div>
          <button onClick={handleUpgrade} className="btn-gold w-full justify-center">
            Upgrade to Premium
          </button>
          <p className="text-2xs text-muted">7-day free trial · Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}
