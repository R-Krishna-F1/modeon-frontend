// src/pages/PricingPage.jsx
import { useState }      from 'react';
import { motion }        from 'framer-motion';
import { CheckCircle2 }  from 'lucide-react';
import PageWrapper       from '@/components/layout/PageWrapper';
import { PricingCard }   from '@/components/subscription/PricingCard';
import useSubscriptionStore from '@/stores/useSubscriptionStore';

const COMPARISON = [
  { feature: 'Wardrobe items',            free: '50',       premium: 'Unlimited' },
  { feature: 'Daily outfit suggestions',  free: '1 + 1 retry', premium: 'Unlimited' },
  { feature: 'Swipe discovery sessions',  free: '✓',        premium: '✓' },
  { feature: 'Occasion styling',          free: '✗',        premium: '✓ (3–5 outfits)' },
  { feature: 'Mix & Match Builder',       free: '✗',        premium: '✓' },
  { feature: 'Outfit Check',              free: '✗',        premium: '✓' },
  { feature: 'Shopping comparisons',      free: '5/month',  premium: 'Unlimited' },
  { feature: 'Shopping list outfits',     free: '3',        premium: '10' },
  { feature: 'Watermark-free exports',    free: '✗',        premium: '✓' },
];

export default function PricingPage() {
  const [period, setPeriod]   = useState('monthly');
  const currentPlan           = useSubscriptionStore((s) => s.plan);

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-display text-5xl mb-4">Simple, honest pricing</h1>
          <p className="text-muted max-w-md mx-auto">Start free. Upgrade when your wardrobe deserves more.</p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-semibold ${period === 'monthly' ? 'text-ink' : 'text-muted'}`}>Monthly</span>
            <button
              onClick={() => setPeriod((p) => p === 'monthly' ? 'yearly' : 'monthly')}
              aria-label="Toggle billing period"
              className={`relative w-12 h-6 rounded-full transition-colors ${period === 'yearly' ? 'bg-gold' : 'bg-divider'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${period === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-semibold ${period === 'yearly' ? 'text-ink' : 'text-muted'}`}>
              Yearly <span className="text-ok font-bold">–33%</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <PricingCard plan="free"    billingPeriod={period} currentPlan={currentPlan} />
          <PricingCard plan="premium" billingPeriod={period} currentPlan={currentPlan} />
        </div>

        {/* Comparison table */}
        <div className="card overflow-hidden p-0">
          <div className="grid grid-cols-3 bg-surface px-6 py-4 border-b border-divider">
            <p className="font-bold text-sm text-ink">Feature</p>
            <p className="font-bold text-sm text-center text-muted">Essential</p>
            <p className="font-bold text-sm text-center text-gold">Premium Luxe</p>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 px-6 py-4 border-b border-divider last:border-0 ${i % 2 === 0 ? '' : 'bg-surface/40'}`}
            >
              <p className="text-sm text-ink">{row.feature}</p>
              <p className={`text-sm text-center ${row.free === '✗' ? 'text-muted' : 'text-taupe font-medium'}`}>{row.free}</p>
              <p className={`text-sm text-center font-semibold ${row.premium === '✗' ? 'text-muted' : 'text-gold'}`}>
                {row.premium === '✓' ? <CheckCircle2 size={16} className="mx-auto text-gold" /> : row.premium}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="text-center mt-16">
          <p className="text-2xs font-bold tracking-widest uppercase text-muted mb-4">Trusted by 10,000+ fashionistas</p>
          <p className="font-display italic text-xl text-taupe max-w-lg mx-auto leading-relaxed">
            "Modeon transformed how I see my closet. I stopped over-shopping and started discovering gems I already owned."
          </p>
          <p className="font-bold text-sm mt-4">— Elena R., Paris</p>
        </div>
      </div>
    </PageWrapper>
  );
}
