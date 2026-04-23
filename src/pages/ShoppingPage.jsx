// src/pages/ShoppingPage.jsx
import { useState }              from 'react';
import { motion }                from 'framer-motion';
import { Sparkles }              from 'lucide-react';
import PageWrapper               from '@/components/layout/PageWrapper';
import { ShoppingUploadZone }    from '@/components/shopping/ShoppingUploadZone';
import { ShoppingItemPreview }   from '@/components/shopping/ShoppingItemPreview';
import { CompareResultCard }     from '@/components/shopping/CompareResultCard';
import { ShoppingListGrid }      from '@/components/shopping/ShoppingListGrid';
import { ShoppingOutfitCard }    from '@/components/shopping/ShoppingOutfitCard';
import Spinner                   from '@/components/ui/Spinner';
import useShoppingStore          from '@/stores/useShoppingStore';
import useSubscriptionStore      from '@/stores/useSubscriptionStore';
import useUIStore                from '@/stores/useUIStore';
// TODO (Backend): POST /api/shopping/upload
// TODO (Backend): POST /api/shopping/compare
// TODO (Backend): POST /api/shopping-list/add
// TODO (Backend): POST /api/shopping-list/outfits/generate

const TABS = ['Upload & Compare', 'Shopping List', 'Outfit Generator'];

export default function ShoppingPage() {
  const isPremium    = useSubscriptionStore((s) => s.isPremium());
  const addToast     = useUIStore((s) => s.addToast);
  const {
    uploadedItem, setUploadedItem,
    compareResult, setCompareResult,
    compareUsage, setCompareUsage,
    shoppingList, addToList, removeFromList,
  } = useShoppingStore();

  const [tab,       setTab]       = useState(0);
  const [preview,   setPreview]   = useState(null); // object URL
  const [comparing, setComparing] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [genResults, setGenResults] = useState([]);

  const handleFile = (file) => {
    // TODO (Backend): POST /api/shopping/upload
    setPreview(URL.createObjectURL(file));
    setUploadedItem({ id: Date.now().toString(), file, thumbnail: URL.createObjectURL(file) });
    setCompareResult(null);
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  const handleCompare = async () => {
    if (!uploadedItem || compareUsage.used >= compareUsage.limit) return;
    setComparing(true);
    try {
      // TODO (Backend): POST /api/shopping/compare { upload_id: uploadedItem.id }
      await new Promise((r) => setTimeout(r, 900));
      setCompareResult({
        result:        'compatible',
        explanation:   'This piece works beautifully with your existing wardrobe. The colour and silhouette complement your navy trousers and beige outerwear particularly well.',
        matching_items: ['Navy Trousers', 'Beige Coat', 'Black Shoes'],
      });
      setCompareUsage({ ...compareUsage, used: compareUsage.used + 1 });
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    } finally {
      setComparing(false);
    }
  };

  const handleAddToList = () => {
    if (!uploadedItem) return;
    addToList({ ...uploadedItem, addedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) });
    addToast({ type: 'success', message: 'Added to shopping list.' });
  };

  const handleGenerate = async () => {
    setGenLoading(true);
    try {
      // TODO (Backend): POST /api/shopping-list/outfits/generate
      await new Promise((r) => setTimeout(r, 1000));
      setGenResults([
        { id: 'g1', items: [shoppingList[0]?.thumbnail || 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300', 'https://images.unsplash.com/photo-1624372333454-da58f936a1bc?w=300'], explanation: 'Your new piece pairs effortlessly with existing wardrobe staples for a polished everyday look.' },
        { id: 'g2', items: [shoppingList[0]?.thumbnail || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300'], explanation: 'A smart-casual combination that elevates your shopping list item with complementary pieces.' },
      ]);
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <PageWrapper>
      <header className="mb-10">
        <h1 className="font-display text-5xl mb-1">Shopping</h1>
        <p className="text-sm text-muted italic">Shop smarter — check before you buy.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface rounded-2xl p-1 w-fit mb-10 flex-wrap">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all
              ${tab === i ? 'bg-card shadow-card text-ink' : 'text-muted hover:text-ink'}`}
            aria-pressed={tab === i}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Upload & Compare */}
      {tab === 0 && (
        <div className="flex flex-col gap-6 max-w-2xl">
          {!preview ? (
            <ShoppingUploadZone onFile={handleFile} />
          ) : (
            <>
              <ShoppingItemPreview
                preview={preview}
                onCompare={handleCompare}
                onAddToList={handleAddToList}
                comparing={comparing}
                usageUsed={compareUsage.used}
                usageLimit={isPremium ? 999 : compareUsage.limit}
              />
              {compareResult && <CompareResultCard result={compareResult} />}
              {compareResult && (
                <div className="flex gap-3 flex-wrap">
                  <button onClick={handleAddToList} className="btn-secondary">Add to Shopping List</button>
                  <button onClick={() => { setPreview(null); setCompareResult(null); }} className="btn-ghost">Upload Another</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Shopping List */}
      {tab === 1 && (
        <div className="max-w-2xl">
          <ShoppingListGrid
            items={shoppingList}
            onRemove={removeFromList}
            onMoveToWardrobe={(id) => {
              removeFromList(id);
              addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
            }}
          />
        </div>
      )}

      {/* Outfit Generator */}
      {tab === 2 && (
        <div className="flex flex-col gap-6">
          <div className={`card ${shoppingList.length < 2 ? 'opacity-60' : ''}`}>
            <p className="text-sm text-taupe mb-4">
              {shoppingList.length < 2
                ? 'Add at least 2 items to your Shopping List to unlock the Outfit Generator.'
                : `Generating outfits from ${shoppingList.length} shopping list items${!isPremium ? ' (free: 3 max)' : ' (up to 10)'}.`}
            </p>
            <button
              onClick={handleGenerate}
              disabled={shoppingList.length < 2 || genLoading}
              className="btn-gold"
              aria-label="Generate outfits from shopping list"
            >
              {genLoading ? <Spinner size="sm" /> : <Sparkles size={15} />}
              {genLoading ? 'Generating…' : 'Generate Outfits from Shopping List'}
            </button>
          </div>

          {genResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {genResults.map((outfit, i) => (
                <ShoppingOutfitCard key={outfit.id} outfit={outfit} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
