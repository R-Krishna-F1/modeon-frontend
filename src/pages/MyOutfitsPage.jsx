// src/pages/MyOutfitsPage.jsx
import { useState }        from 'react';
import PageWrapper         from '@/components/layout/PageWrapper';
import OutfitGallery       from '@/components/outfits/OutfitGallery';
import OutfitExportModal   from '@/components/outfits/OutfitExportModal';
import useUIStore          from '@/stores/useUIStore';

const MOCK_OUTFITS = [
  { id: '1', date: '20 April 2026', occasion: 'Art Exhibition',        explanation: 'A refined combination of textures and tones saved for future inspiration.',
    items: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300','https://images.unsplash.com/photo-1624372333454-da58f936a1bc?w=300','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300'] },
  { id: '2', date: '18 April 2026', occasion: 'Business Presentation',  explanation: 'Sharp and professional — confidence in every stitch.',
    items: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300'] },
  { id: '3', date: '15 April 2026', occasion: 'Weekend Brunch',         explanation: 'Effortless weekend energy with a warm colour story.',
    items: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300','https://images.unsplash.com/photo-1512412086892-cf0449fb024b?w=300'] },
];

export default function MyOutfitsPage() {
  const addToast = useUIStore((s) => s.addToast);
  const [outfits, setOutfits]         = useState(MOCK_OUTFITS);
  const [exportTarget, setExportTarget] = useState(null);

  const handleDelete = (id) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
    addToast({ type: 'success', message: 'Outfit removed.' });
    // TODO (Backend): DELETE /api/outfits/{id}
  };

  return (
    <PageWrapper>
      <header className="mb-10">
        <h1 className="font-display text-5xl mb-1">My Outfits</h1>
        <p className="text-sm text-muted italic">{outfits.length} saved ensembles</p>
      </header>

      <OutfitGallery
        outfits={outfits}
        onDelete={handleDelete}
        onShare={(outfit) => setExportTarget(outfit)}
      />

      <OutfitExportModal
        open={!!exportTarget}
        outfit={exportTarget}
        onClose={() => setExportTarget(null)}
      />
    </PageWrapper>
  );
}
