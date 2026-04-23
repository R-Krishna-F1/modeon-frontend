// src/pages/WardrobePage.jsx
import { useState }           from 'react';
import { Plus }               from 'lucide-react';
import PageWrapper            from '@/components/layout/PageWrapper';
import WardrobeGrid           from '@/components/wardrobe/WardrobeGrid';
import WardrobeSearchBar      from '@/components/wardrobe/WardrobeSearchBar';
import WardrobeFilterPanel    from '@/components/wardrobe/WardrobeFilterPanel';
import WardrobeItemDetail     from '@/components/wardrobe/WardrobeItemDetail';
import UploadModal            from '@/components/wardrobe/UploadModal';
import BulkActionBar          from '@/components/wardrobe/BulkActionBar';
import useWardrobeStore       from '@/stores/useWardrobeStore';
import useUIStore             from '@/stores/useUIStore';
import { trackEvent }         from '@/lib/posthog';

// Mock data — replaced by useWardrobe hook once backend is live
const MOCK_ITEMS = [
  { id: '1', category: 'Outerwear',   color: 'Beige',  image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', inLaundry: false },
  { id: '2', category: 'Tops',        color: 'White',  image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', inLaundry: true  },
  { id: '3', category: 'Bottoms',     color: 'Navy',   image: 'https://images.unsplash.com/photo-1624372333454-da58f936a1bc?w=400', inLaundry: false },
  { id: '4', category: 'Shoes',       color: 'Black',  image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', inLaundry: false },
  { id: '5', category: 'Accessories', color: 'Gold',   image: 'https://images.unsplash.com/photo-1535633302704-c0299ba4d9cb?w=400', inLaundry: false },
  { id: '6', category: 'Dresses',     color: 'Black',  image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400', inLaundry: false },
  { id: '7', category: 'Tops',        color: 'Sage',   image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400', inLaundry: false },
  { id: '8', category: 'Bottoms',     color: 'Cream',  image: 'https://images.unsplash.com/photo-1596755094514-f87034a2612d?w=400', inLaundry: false },
];

export default function WardrobePage() {
  const addToast       = useUIStore((s) => s.addToast);
  const [items, setItems]         = useState(MOCK_ITEMS);
  const [search, setSearch]       = useState('');
  const [uploadOpen, setUpload]   = useState(false);
  const [selectedItem, setSelected] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const filters       = useWardrobeStore((s) => s.filters);

  const filtered = items.filter((item) => {
    if (filters.category.length  && !filters.category.includes(item.category))  return false;
    if (filters.colours.length   && !filters.colours.includes(item.color))       return false;
    if (filters.laundry          && !item.inLaundry)                             return false;
    const q = search.toLowerCase();
    return !q || item.category.toLowerCase().includes(q) || item.color.toLowerCase().includes(q);
  });

  const toggleLaundry = (id, val) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, inLaundry: val } : i));
    trackEvent(val ? 'laundry_item_marked' : 'laundry_item_unmarked', { item_id: id });
    // TODO (Backend): PATCH /api/wardrobe/{id}/laundry { inLaundry: val }
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    addToast({ type: 'success', message: 'Item removed.' });
    // TODO (Backend): DELETE /api/wardrobe/{id}
  };

  const bulkLaundry = (ids, val) => {
    setItems((prev) => prev.map((i) => ids.includes(i.id) ? { ...i, inLaundry: val } : i));
    setSelectedIds([]);
  };

  return (
    <PageWrapper>
      <header className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl mb-1">My Wardrobe</h1>
          <p className="text-sm text-muted italic">{items.length} items curated</p>
        </div>
        <button onClick={() => setUpload(true)} className="btn-secondary" aria-label="Add new item">
          <Plus size={16} /> Add Item
        </button>
      </header>

      {/* Search */}
      <div className="mb-8">
        <WardrobeSearchBar value={search} onChange={setSearch} />
      </div>

      <div className="flex gap-8">
        <WardrobeFilterPanel />
        <div className="flex-1 min-w-0">
          <WardrobeGrid
            items={filtered}
            onToggleLaundry={toggleLaundry}
            onDelete={deleteItem}
            onItemClick={setSelected}
          />
        </div>
      </div>

      <WardrobeItemDetail
        item={selectedItem}
        onClose={() => setSelected(null)}
        onToggleLaundry={toggleLaundry}
        onDelete={deleteItem}
      />

      <BulkActionBar
        selectedIds={selectedIds}
        onClearSelection={() => setSelectedIds([])}
        onBulkLaundry={bulkLaundry}
        onBulkDelete={(ids) => { ids.forEach(deleteItem); setSelectedIds([]); }}
      />

      <UploadModal open={uploadOpen} onClose={() => setUpload(false)} />
    </PageWrapper>
  );
}
