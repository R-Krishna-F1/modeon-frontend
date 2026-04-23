// src/components/subscription/UpgradePrompt.jsx
import { Crown }      from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES }     from '@/constants/routes';

export function UpgradePrompt({ message = 'Upgrade to Premium to unlock this feature.' }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-2xl px-5 py-4">
      <Crown size={18} className="text-gold flex-shrink-0" />
      <p className="text-sm text-taupe flex-1">{message}</p>
      <button
        onClick={() => navigate(ROUTES.PRICING)}
        className="btn-gold text-2xs px-4 py-2"
        aria-label="Upgrade to Premium"
      >
        Upgrade
      </button>
    </div>
  );
}
