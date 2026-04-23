// src/components/subscription/PricingCard.jsx
import { CheckCircle2, Star } from 'lucide-react';
import { motion }             from 'framer-motion';
import useUIStore             from '@/stores/useUIStore';
// TODO (Backend): POST /api/billing/checkout — create Stripe Checkout session

const FREE_FEATURES = [
  'Up to 50 wardrobe items',
  '1 daily outfit suggestion',
  'Basic style discovery',
  '5 shopping comparisons / month',
];

const PREMIUM_FEATURES = [
  'Unlimited wardrobe storage',
  'Unlimited daily suggestions + Try Another',
  'Occasion-based styling (3–5 options)',
  'Mix & Match Builder',
  'Outfit Check with AI feedback',
  'Unlimited shopping comparisons',
  'Shopping List Outfit Generator (10 combos)',
  'Watermark-free outfit exports',
];

export function PricingCard({ plan = 'free', billingPeriod = 'monthly', currentPlan = 'free' }) {
  const addToast  = useUIStore((s) => s.addToast);
  const isPremium = plan === 'premium';

  const handleUpgrade = () => {
    // TODO (Backend): POST /api/billing/checkout — create Stripe Checkout session; redirect to Stripe-hosted payment page
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  return (
    <motion.div
      whileHover={isPremium ? { scale: 1.02 } : undefined}
      className={`card text-left relative overflow-hidden ${isPremium ? 'border-gold' : 'opacity-80'}`}
    >
      {isPremium && (
        <div className="absolute top-5 right-5 bg-gold text-white px-3 py-1 rounded-chip text-2xs font-bold tracking-wide flex items-center gap-1">
          <Star size={10} fill="white" /> Popular
        </div>
      )}

      <div className="mb-6">
        <p className={`text-2xs font-bold tracking-widest uppercase mb-2 ${isPremium ? 'text-gold' : 'text-muted'}`}>
          {isPremium ? 'Premium Luxe' : 'Essential'}
        </p>
        <p className="font-display text-4xl text-ink">
          {isPremium
            ? (billingPeriod === 'yearly' ? '$6.67' : '$9.99')
            : '$0'}
          <span className="text-base text-muted font-sans font-normal">
            {isPremium ? (billingPeriod === 'yearly' ? ' / mo (billed yearly)' : ' / mo') : ' / forever'}
          </span>
        </p>
        {isPremium && billingPeriod === 'yearly' && (
          <p className="text-xs text-ok font-semibold mt-1">Save 33% — $79.99 / year</p>
        )}
      </div>

      <ul className="flex flex-col gap-3.5 mb-8">
        {(isPremium ? PREMIUM_FEATURES : FREE_FEATURES).map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${isPremium ? 'text-gold' : 'text-muted'}`} />
            {f}
          </li>
        ))}
      </ul>

      {isPremium ? (
        <button onClick={handleUpgrade} className="btn-gold w-full justify-center">
          {currentPlan === 'premium' ? 'Current Plan' : 'Subscribe Now'}
        </button>
      ) : (
        <button disabled className="btn-secondary w-full justify-center opacity-60 cursor-default">
          {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
        </button>
      )}

      {isPremium && (
        <p className="text-2xs text-muted text-center mt-3">Cancel anytime · 7-day free trial</p>
      )}
    </motion.div>
  );
}
