// src/pages/OccasionStylingPage.jsx
import { useState }          from 'react';
import { motion }            from 'framer-motion';
import { Sparkles }          from 'lucide-react';
import PageWrapper           from '@/components/layout/PageWrapper';
import OutfitCard            from '@/components/outfits/OutfitCard';
import PremiumLock           from '@/components/ui/PremiumLock';
import Spinner               from '@/components/ui/Spinner';
import { OCCASIONS }         from '@/constants/occasions';
import useSubscriptionStore  from '@/stores/useSubscriptionStore';
import useUIStore            from '@/stores/useUIStore';
// TODO (Backend): POST /api/outfits/occasion — requires Premium; calls Azure OpenAI GPT-4o

const MOCK_RESULTS = [
  { id: 'r1', occasion: 'Date Night', explanation: 'A silk midi slip dress in ivory paired with strappy black sandals — understated and quietly stunning.',
    items: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300'] },
  { id: 'r2', occasion: 'Date Night', explanation: 'Tailored wide-leg trousers meet a fitted satin top, finished with a gold cuff — effortlessly evening.',
    items: ['https://images.unsplash.com/photo-1596755094514-f87034a2612d?w=300','https://images.unsplash.com/photo-1535633302704-c0299ba4d9cb?w=300'] },
  { id: 'r3', occasion: 'Date Night', explanation: 'Classic little black dress elevated with a structured blazer and pointed-toe heels.',
    items: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300','https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300'] },
];

export default function OccasionStylingPage() {
  const isPremium   = useSubscriptionStore((s) => s.isPremium());
  const addToast    = useUIStore((s) => s.addToast);
  const [occasion,  setOccasion]   = useState('');
  const [desc,      setDesc]       = useState('');
  const [results,   setResults]    = useState([]);
  const [loading,   setLoading]    = useState(false);

  const handleGenerate = async () => {
    if (!occasion) return;
    setLoading(true);
    try {
      // TODO (Backend): POST /api/outfits/occasion { occasion, description: desc }
      await new Promise((r) => setTimeout(r, 1000)); // stub delay
      setResults(MOCK_RESULTS);
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <header className="mb-10">
        <h1 className="font-display text-5xl mb-1">Occasion Styling</h1>
        <p className="text-sm text-muted italic">Let AI build your perfect outfit for any event.</p>
      </header>

      <PremiumLock locked={!isPremium}>
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          {/* Controls */}
          <div className="card flex flex-col gap-5 h-fit">
            <div>
              <label htmlFor="occasion" className="label">Occasion</label>
              <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="input"
                aria-label="Select occasion"
              >
                <option value="">Select an occasion…</option>
                {OCCASIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.icon} {o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="desc" className="label">Additional context <span className="text-muted font-normal">(optional)</span></label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value.slice(0, 300))}
                placeholder="e.g. outdoor garden party, smart-casual dress code, summer evening…"
                rows={4}
                className="input resize-none"
                aria-label="Additional context"
              />
              <p className="text-2xs text-muted text-right mt-1">{desc.length}/300</p>
            </div>
            <button
              onClick={handleGenerate}
              disabled={!occasion || loading}
              className="btn-gold w-full justify-center"
              aria-label="Generate occasion outfits"
            >
              {loading ? <Spinner size="sm" /> : <Sparkles size={15} />}
              {loading ? 'Generating…' : 'Generate Outfits'}
            </button>
          </div>

          {/* Results */}
          <div>
            {loading && (
              <div className="flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            )}
            {!loading && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((outfit) => (
                  <OutfitCard key={outfit.id} outfit={outfit} />
                ))}
              </div>
            )}
            {!loading && results.length === 0 && (
              <div className="flex items-center justify-center h-64 text-muted italic text-sm">
                Select an occasion and click Generate to see outfit suggestions.
              </div>
            )}
          </div>
        </div>
      </PremiumLock>
    </PageWrapper>
  );
}
