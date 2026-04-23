// src/pages/PricingPage.jsx
import { CheckCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';

const ALL_FEATURES = [
  'Wardrobe digitisation with AI tagging',
  'Unlimited wardrobe uploads',
  'Daily AI outfit generation',
  'Swipe-based outfit learning',
  'My Outfits gallery',
  'Occasion Styling - AI-generated looks for any event',
  'Mix & Match Builder with drag-and-drop canvas',
  'Outfit Check - AI feedback on your photos',
  'Shopping comparison - check items against your wardrobe',
  'Shopping List with outfit generation',
  'Outfit export and sharing',
  'Dark and light mode',
  'Full keyboard accessibility',
];

export default function PricingPage() {
  return (
    <PageWrapper>
      <header className="mb-12 text-center">
        <h1 className="font-display text-5xl mb-3">Free &amp; Open Source</h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Modeon is open source. Every feature is available to everyone - no subscriptions, no tiers, no paywalls.
        </p>
      </header>

      <div className="max-w-xl mx-auto card flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="badge bg-gold/15 text-gold text-sm px-4 py-1.5 font-bold">All Features Unlocked</span>
        </div>
        <ul className="flex flex-col gap-3">
          {ALL_FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <CheckCircle size={17} className="text-gold mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/R-Krishna-F1/modeon-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center"
          aria-label="View Modeon on GitHub"
        >
          View on GitHub
        </a>
      </div>
    </PageWrapper>
  );
}
