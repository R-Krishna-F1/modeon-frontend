// src/pages/SwipeSessionPage.jsx
import { useState }       from 'react';
import { useNavigate }    from 'react-router-dom';
import { ArrowLeft }      from 'lucide-react';
import { ROUTES }         from '@/constants/routes';
import OutfitCardStack    from '@/components/outfits/OutfitCardStack';
import SwipeControls      from '@/components/outfits/SwipeControls';
import SwipeProgress      from '@/components/outfits/SwipeProgress';
import SwipeSummary       from '@/components/outfits/SwipeSummary';
import { trackEvent }     from '@/lib/posthog';
// TODO (Backend): GET /api/outfits/swipe-session — generate outfit combos ranked by style profile
// TODO (Backend): POST /api/outfits/swipe — record each swipe

const MOCK_OUTFITS = [
  { id: '1', items: [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300',
    'https://images.unsplash.com/photo-1624372333454-da58f936a1bc?w=300',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300',
  ], explanation: 'A clean, sophisticated ensemble blending warm silk textures with structured wool. Ideal for crisp spring mornings.' },
  { id: '2', items: [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300',
  ], explanation: 'Elegant minimalist evening wear. The silk slip dress paired with block heels creates a timeless silhouette.' },
  { id: '3', items: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300',
    'https://images.unsplash.com/photo-1512412086892-cf0449fb024b?w=300',
  ], explanation: 'Modern streetwear with a luxury twist. Oversized hoodie layered with a structured blazer for an effortless architectural vibe.' },
  { id: '4', items: [
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300',
    'https://images.unsplash.com/photo-1535633302704-c0299ba4d9cb?w=300',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300',
  ], explanation: 'Tonal neutrals with a golden accessory punctuation. This capsule works from coffee to cocktails.' },
  { id: '5', items: [
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300',
    'https://images.unsplash.com/photo-1596755094514-f87034a2612d?w=300',
  ], explanation: 'A sage-and-cream combination that feels effortlessly put-together for a weekend in the city.' },
];

export default function SwipeSessionPage() {
  const navigate  = useNavigate();
  const [queue,   setQueue]   = useState(MOCK_OUTFITS);
  const [liked,   setLiked]   = useState(0);
  const [saved,   setSaved]   = useState(0);
  const [done,    setDone]    = useState(false);
  const total = MOCK_OUTFITS.length;

  const handleSwipe = (outfit, direction) => {
    // TODO (Backend): POST /api/outfits/swipe { outfit_id: outfit.id, direction }
    trackEvent('outfit_swiped', { direction, outfit_id: outfit.id });
    if (direction === 'like') setLiked((n) => n + 1);
    setQueue((prev) => {
      const next = prev.filter((o) => o.id !== outfit.id);
      if (!next.length) setDone(true);
      return next;
    });
  };

  const handleSave = (outfit) => {
    // TODO (Backend): POST /api/outfits/{outfit.id}/save
    trackEvent('outfit_saved', { outfit_id: outfit.id });
    setSaved((n) => n + 1);
    setQueue((prev) => {
      const next = prev.filter((o) => o.id !== outfit.id);
      if (!next.length) setDone(true);
      return next;
    });
  };

  const handleRestart = () => {
    trackEvent('swipe_session_started', { restarted: true });
    setQueue(MOCK_OUTFITS);
    setLiked(0);
    setSaved(0);
    setDone(false);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Top bar */}
      <div className="flex items-center px-8 py-5 border-b border-divider">
        <button onClick={() => navigate(ROUTES.DASHBOARD)} className="btn-ghost" aria-label="Back to dashboard">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="font-display text-2xl mx-auto">Style Discovery</h1>
        <div className="w-24" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {done ? (
          <SwipeSummary
            liked={liked}
            saved={saved}
            total={total}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <SwipeProgress current={queue.length} total={total} />
            <OutfitCardStack
              outfits={queue}
              onSwipe={handleSwipe}
              onSave={handleSave}
            />
            <SwipeControls
              onDislike={() => queue[0] && handleSwipe(queue[0], 'dislike')}
              onSave={() => queue[0] && handleSave(queue[0])}
              onLike={() => queue[0] && handleSwipe(queue[0], 'like')}
              disabled={!queue.length}
            />
            <p className="text-2xs text-muted mt-6 font-medium">
              ← Dislike · Save ★ · Like →  · or use arrow keys
            </p>
          </>
        )}
      </div>
    </div>
  );
}
