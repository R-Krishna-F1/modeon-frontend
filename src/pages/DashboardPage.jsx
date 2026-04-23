// src/pages/DashboardPage.jsx
import { useNavigate }    from 'react-router-dom';
import { motion }         from 'framer-motion';
import { Sparkles, Shirt, ShoppingBag, Layers, Heart } from 'lucide-react';
import { ROUTES }         from '@/constants/routes';
import DailyOutfitCard    from '@/components/outfits/DailyOutfitCard';
import { OutfitCollage }  from '@/components/outfits/OutfitCard';
import PageWrapper        from '@/components/layout/PageWrapper';
import useAuthStore       from '@/stores/useAuthStore';

const MOCK_SAVED = [
  { id: '1', occasion: 'Art Exhibition',  items: [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300',
    'https://images.unsplash.com/photo-1624372333454-da58f936a1bc?w=300',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300',
  ]},
  { id: '2', occasion: 'Business',        items: [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300',
  ]},
  { id: '3', occasion: 'Weekend Brunch',  items: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300',
    'https://images.unsplash.com/photo-1512412086892-cf0449fb024b?w=300',
  ]},
];

const QUICK_ACTIONS = [
  { icon: Sparkles,    label: 'Start Swipe Session', to: ROUTES.SWIPE,     style: 'btn-gold'      },
  { icon: Shirt,       label: 'Go to Wardrobe',      to: ROUTES.WARDROBE,  style: 'btn-secondary' },
  { icon: ShoppingBag, label: 'Shopping',             to: ROUTES.SHOPPING,  style: 'btn-secondary' },
  { icon: Layers,      label: 'Mix & Match',          to: ROUTES.MIX_MATCH, style: 'btn-secondary' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const user     = useAuthStore((s) => s.user);
  const today    = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const name     = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  const stats = [
    { label: 'Items',    value: '142' },
    { label: 'Liked',    value: '28'  },
    { label: 'Laundry',  value: '12'  },
    { label: 'Sessions', value: '7'   },
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <header className="flex justify-between items-end mb-10 flex-wrap gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl mb-1"
          >
            Good morning, {name} ✦
          </motion.h1>
          <p className="text-2xs font-bold tracking-widest uppercase text-muted">{today}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate(ROUTES.WARDROBE)} className="btn-secondary">
            <Shirt size={15} /> Upload Item
          </button>
          <button onClick={() => navigate(ROUTES.SWIPE)} className="btn-gold">
            <Sparkles size={15} /> Style Me
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
        {/* Daily outfit */}
        <DailyOutfitCard />

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-divider rounded-2xl p-5 text-center">
                <div className="font-display text-3xl mb-1">{s.value}</div>
                <div className="text-2xs font-bold tracking-widest uppercase text-muted">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="card p-5 flex flex-col gap-3">
            <p className="label">Quick Actions</p>
            {QUICK_ACTIONS.map(({ icon: Icon, label, to, style }) => (
              <button key={to} onClick={() => navigate(to)} className={`${style} w-full justify-center`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {/* Recent saved outfits */}
          <div className="card p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="font-display text-lg">Recent Outfits</p>
              <button onClick={() => navigate(ROUTES.MY_OUTFITS)} className="text-2xs text-gold font-bold tracking-widest uppercase hover:underline">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_SAVED.map((outfit) => (
                <div key={outfit.id} className="flex items-center gap-3 rounded-xl overflow-hidden border border-divider">
                  <div className="w-16 h-16 flex-shrink-0">
                    <OutfitCollage items={outfit.items} height={64} radius={0} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{outfit.occasion}</p>
                    <p className="text-2xs text-muted">{outfit.items.length} items</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate(ROUTES.SWIPE)} className="btn-gold w-full justify-center mt-4">
              <Sparkles size={15} /> Start Swipe Session
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
