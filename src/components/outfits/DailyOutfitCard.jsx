// src/components/outfits/DailyOutfitCard.jsx
import { useState }   from 'react';
import { motion }     from 'framer-motion';
import { X, Heart, RefreshCw, Star, Sparkles } from 'lucide-react';
import useUIStore     from '@/stores/useUIStore';
// TODO (Backend): POST /api/outfits/generate

const DEMO_OUTFIT = {
  name:        'The Parisian Minimalist',
  explanation: 'A sophisticated pairing for a 2 PM gallery opening. The structured charcoal blazer balances the fluidity of the silk cream camisole, finished with heritage leather loafers for an effortless transition from meeting to soirée.',
  items: [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400',
  ],
};

export default function DailyOutfitCard() {
  const addToast = useUIStore((s) => s.addToast);
  const [liked,  setLiked]  = useState(null); // null | true | false
  const [saved,  setSaved]  = useState(false);

  const handleTryAnother = () => {
    // TODO (Backend): POST /api/outfits/generate { regenerate: true } — free tier limits to 1 retry
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  const handleSave = () => {
    // TODO (Backend): POST /api/outfits/{outfit_id}/save
    setSaved(true);
    addToast({ type: 'success', message: 'Outfit saved!' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="badge">Today's Selection</span>
          <h2 className="font-display text-3xl mt-2">{DEMO_OUTFIT.name}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setLiked(false); addToast({ type: 'info', message: 'Noted! We\'ll refine your suggestions.' }); }}
            aria-label="Dislike outfit"
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all
              ${liked === false ? 'border-danger bg-danger/10 text-danger' : 'border-divider bg-card text-danger hover:border-danger'}`}
          >
            <X size={18} />
          </button>
          <button
            onClick={() => { setLiked(true); addToast({ type: 'success', message: 'Loved! Your style profile is updating.' }); }}
            aria-label="Like outfit"
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all
              ${liked === true ? 'border-ok bg-ok/10 text-ok' : 'border-divider bg-card text-ok hover:border-ok'}`}
          >
            <Heart size={18} fill={liked === true ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Collage */}
      <div className="grid grid-cols-3 gap-3 mb-6 min-h-[280px]">
        <div className="rounded-2xl overflow-hidden col-span-1">
          <img src={DEMO_OUTFIT.items[0]} className="w-full h-full object-cover" alt="Blazer" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl overflow-hidden flex-1">
            <img src={DEMO_OUTFIT.items[1]} className="w-full h-full object-cover" alt="Shoes" />
          </div>
          <div className="rounded-2xl overflow-hidden flex-1">
            <img src={DEMO_OUTFIT.items[2]} className="w-full h-full object-cover" alt="Top" />
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden col-span-1">
          <img src={DEMO_OUTFIT.items[3]} className="w-full h-full object-cover" alt="Bag" />
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/70 mb-5">
        <p className="italic leading-relaxed text-taupe text-sm">{DEMO_OUTFIT.explanation}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleTryAnother} className="btn-secondary flex-1 justify-center">
          <RefreshCw size={15} /> Try Another
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className="btn-gold flex-1 justify-center"
          aria-label="Save outfit"
        >
          <Star size={15} fill={saved ? 'white' : 'none'} />
          {saved ? 'Saved!' : 'Save Outfit'}
        </button>
      </div>

      {/* Decorative circle */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gold/8 rounded-full pointer-events-none" />
    </motion.div>
  );
}
