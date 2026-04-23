// src/pages/MixMatchPage.jsx
import { useState }           from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Save, Zap }          from 'lucide-react';
import PageWrapper            from '@/components/layout/PageWrapper';
import PremiumLock            from '@/components/ui/PremiumLock';
import { MixMatchCanvas }     from '@/components/mixmatch/MixMatchCanvas';
import { ItemPicker }         from '@/components/mixmatch/ItemPicker';
import { CompatibilityScore } from '@/components/mixmatch/CompatibilityScore';
import useSubscriptionStore   from '@/stores/useSubscriptionStore';
import useUIStore             from '@/stores/useUIStore';
// TODO (Backend): POST /api/outfits/score — send item_ids; returns { score, explanation }
// TODO (Backend): POST /api/outfits/{id}/save — persist named outfit

export default function MixMatchPage() {
  const isPremium  = useSubscriptionStore((s) => s.isPremium());
  const addToast   = useUIStore((s) => s.addToast);

  const [slots,       setSlots]       = useState({});  // { [slotId]: item }
  const [score,       setScore]       = useState(null);
  const [explanation, setExplanation] = useState('');
  const [scoring,     setScoring]     = useState(false);
  const [saveName,    setSaveName]    = useState('');
  const [activeItem,  setActiveItem]  = useState(null);

  const filledSlots = Object.values(slots).filter(Boolean);

  const handleDragStart = (event) => {
    setActiveItem(event.active.data.current?.item || null);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveItem(null);
    if (!over) return;
    const item = active.data.current?.item;
    if (item && over.id) {
      setSlots((prev) => ({ ...prev, [over.id]: item }));
      setScore(null);
      setExplanation('');
    }
  };

  const handleRemoveSlot = (slotId) => {
    setSlots((prev) => { const n = { ...prev }; delete n[slotId]; return n; });
    setScore(null);
    setExplanation('');
  };

  const handleScore = async () => {
    if (filledSlots.length < 2) {
      addToast({ type: 'info', message: 'Add at least 2 items to score.' });
      return;
    }
    setScoring(true);
    try {
      // TODO (Backend): POST /api/outfits/score { item_ids: filledSlots.map(i => i.id) }
      await new Promise((r) => setTimeout(r, 900));
      setScore(82);
      setExplanation('Great combination! The tonal palette creates a cohesive, sophisticated look. The structured outerwear anchors the softer fabrics underneath beautifully.');
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    } finally {
      setScoring(false);
    }
  };

  const handleSave = () => {
    // TODO (Backend): POST /api/outfits/{id}/save { name: saveName }
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  return (
    <PageWrapper>
      <header className="mb-10">
        <h1 className="font-display text-5xl mb-1">Mix &amp; Match Builder</h1>
        <p className="text-sm text-muted italic">Drag items from your wardrobe onto the canvas.</p>
      </header>

      <PremiumLock locked={!isPremium}>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-8">
            <ItemPicker />
            <div className="flex-1 flex flex-col gap-6">
              <MixMatchCanvas slotItems={slots} onRemoveSlot={handleRemoveSlot} />

              <CompatibilityScore score={score} explanation={explanation} loading={scoring} />

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleScore}
                  disabled={filledSlots.length < 2 || scoring}
                  className="btn-gold"
                  aria-label="Score outfit compatibility"
                >
                  <Zap size={15} /> Score Outfit
                </button>
                <input
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="Name this outfit…"
                  className="input flex-1 min-w-[180px]"
                  aria-label="Outfit name"
                />
                <button
                  onClick={handleSave}
                  disabled={!filledSlots.length || !saveName.trim()}
                  className="btn-primary"
                  aria-label="Save outfit"
                >
                  <Save size={15} /> Save
                </button>
              </div>
            </div>
          </div>

          <DragOverlay>
            {activeItem && (
              <div className="w-20 h-20 rounded-xl overflow-hidden shadow-float opacity-90">
                <img src={activeItem.image} alt={activeItem.category} className="w-full h-full object-cover" />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </PremiumLock>
    </PageWrapper>
  );
}
