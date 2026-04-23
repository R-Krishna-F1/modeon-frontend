// src/pages/PublicOutfitPage.jsx
// Accessible without authentication — shared outfit view via share token
import { useParams, Link } from 'react-router-dom';
import { motion }          from 'framer-motion';
import { Sparkles }        from 'lucide-react';
import { OutfitCollage }   from '@/components/outfits/OutfitCard';
import { ROUTES }          from '@/constants/routes';
// TODO (Backend): GET /api/outfits/public/{share_token}
//   Returns outfit item images via SAS URLs; validates token not expired (30-day limit)

const MOCK_PUBLIC = {
  occasion:    'Art Exhibition',
  explanation: 'A refined combination of textures and tones — structured charcoal blazer balanced by a fluid silk camisole and heritage leather loafers.',
  items: [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    'https://images.unsplash.com/photo-1624372333454-da58f936a1bc?w=400',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  ],
};

export default function PublicOutfitPage() {
  const { shareToken } = useParams();
  // TODO (Backend): const { data: outfit } = useQuery(['public-outfit', shareToken], () => getPublicOutfit(shareToken));
  const outfit = MOCK_PUBLIC;

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Minimal nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-divider">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center">
            <span className="font-display text-white font-bold text-base leading-none">M</span>
          </div>
          <span className="font-display font-bold text-lg text-ink">Modeon</span>
        </div>
        <Link to={ROUTES.REGISTER} className="btn-gold text-xs px-5 py-2.5" aria-label="Get Modeon free">
          <Sparkles size={13} /> Get Modeon Free
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="card overflow-hidden p-0 relative">
            <OutfitCollage items={outfit.items} height={420} radius={0} />

            {/* Modeon watermark */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white rounded-chip px-3 py-1.5 text-2xs font-bold tracking-wide">
              <div className="w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                <span className="font-display text-white font-bold text-xs leading-none">M</span>
              </div>
              Modeon
            </div>

            <div className="p-6">
              {outfit.occasion && (
                <span className="badge mb-3 inline-block">{outfit.occasion}</span>
              )}
              <p className="font-display text-2xl mb-3">
                The {outfit.occasion || 'Shared'} Ensemble
              </p>
              <p className="text-sm text-taupe italic leading-relaxed">{outfit.explanation}</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted mb-4">
              Want AI outfit suggestions from your own wardrobe?
            </p>
            <Link to={ROUTES.REGISTER} className="btn-gold" aria-label="Create your Modeon account">
              <Sparkles size={15} /> Create Your Own — Free
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
