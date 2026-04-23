// src/pages/AccountPage.jsx
import { useState }             from 'react';
import { useNavigate }          from 'react-router-dom';
import { User, Bell, Trash2, Crown, ChevronRight } from 'lucide-react';
import PageWrapper              from '@/components/layout/PageWrapper';
import { BillingPortalButton }  from '@/components/subscription/BillingPortalButton';
import Modal                    from '@/components/ui/Modal';
import useAuthStore             from '@/stores/useAuthStore';
import useSubscriptionStore     from '@/stores/useSubscriptionStore';
import useUIStore               from '@/stores/useUIStore';
import { STYLE_ARCHETYPES }     from '@/constants/styleArchetypes';
import { OCCASIONS }            from '@/constants/occasions';
import { ROUTES }               from '@/constants/routes';

export default function AccountPage() {
  const navigate     = useNavigate();
  const user         = useAuthStore((s) => s.user);
  const clearAuth    = useAuthStore((s) => s.clearAuth);
  const plan         = useSubscriptionStore((s) => s.plan);
  const isPremium    = useSubscriptionStore((s) => s.isPremium());
  const addToast     = useUIStore((s) => s.addToast);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notifs, setNotifs] = useState({ daily: true, tips: false, newFeatures: true });

  const handleDeleteAccount = () => {
    // TODO (Backend): Supabase Auth user deletion — DELETE /api/auth/account
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    setDeleteOpen(false);
  };

  const handleLogout = () => {
    clearAuth();
    navigate(ROUTES.LOGIN);
  };

  const name  = user?.user_metadata?.full_name || 'Sara Collins';
  const email = user?.email || 'sara@modeon.app';

  const MOCK_ARCHETYPES = ['minimalist', 'classic'];
  const MOCK_OCCASIONS  = ['work', 'casual', 'date_night'];

  return (
    <PageWrapper>
      <h1 className="font-display text-5xl mb-10">Account</h1>

      <div className="max-w-2xl flex flex-col gap-6">
        {/* Profile */}
        <section className="card">
          <h2 className="font-display text-2xl mb-6 flex items-center gap-2"><User size={20} /> Profile</h2>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-full bg-taupe/20 flex items-center justify-center text-2xl font-bold text-taupe">
              {name[0]}
            </div>
            <div>
              <p className="font-bold text-lg text-ink">{name}</p>
              <p className="text-sm text-muted">{email}</p>
            </div>
          </div>
          <div className="border-t border-divider pt-5">
            <p className="text-sm text-muted italic">Name and email are managed via your auth provider. Contact support to update them.</p>
          </div>
        </section>

        {/* Style Profile */}
        <section className="card">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-display text-2xl">Style Profile</h2>
            <button
              onClick={() => navigate(ROUTES.ONBOARDING)}
              className="text-2xs text-gold font-bold tracking-widest uppercase hover:underline flex items-center gap-1"
              aria-label="Edit style profile"
            >
              Edit <ChevronRight size={12} />
            </button>
          </div>
          <div className="mb-4">
            <p className="label mb-2">Archetypes</p>
            <div className="flex flex-wrap gap-2">
              {MOCK_ARCHETYPES.map((a) => {
                const arch = STYLE_ARCHETYPES.find((x) => x.value === a);
                return arch ? (
                  <span key={a} className="badge">{arch.emoji} {arch.label}</span>
                ) : null;
              })}
            </div>
          </div>
          <div>
            <p className="label mb-2">Occasions</p>
            <div className="flex flex-wrap gap-2">
              {MOCK_OCCASIONS.map((o) => {
                const occ = OCCASIONS.find((x) => x.value === o);
                return occ ? (
                  <span key={o} className="badge">{occ.icon} {occ.label}</span>
                ) : null;
              })}
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className="card">
          <h2 className="font-display text-2xl mb-5 flex items-center gap-2"><Crown size={20} className="text-gold" /> Subscription</h2>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-bold text-ink capitalize">{plan} Plan</p>
              <p className="text-sm text-muted">{isPremium ? 'All features unlocked.' : 'Upgrade to unlock all features.'}</p>
            </div>
            <span className={`badge ${isPremium ? 'bg-gold/20 text-gold' : 'bg-surface text-muted'}`}>
              {isPremium ? 'Premium ✦' : 'Free'}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isPremium ? <BillingPortalButton /> : (
              <button onClick={() => navigate(ROUTES.PRICING)} className="btn-gold" aria-label="Upgrade to Premium">
                Upgrade to Premium
              </button>
            )}
          </div>
        </section>

        {/* Notifications */}
        <section className="card">
          <h2 className="font-display text-2xl mb-5 flex items-center gap-2"><Bell size={20} /> Notifications</h2>
          <div className="flex flex-col gap-4">
            {[
              { key: 'daily',      label: 'Daily outfit reminder',   desc: 'Get a nudge each morning to check your outfit.' },
              { key: 'tips',       label: 'Style tips',              desc: 'Occasional curated styling advice.' },
              { key: 'newFeatures',label: 'New features',            desc: 'Be the first to know about updates.' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm text-ink">{label}</p>
                  <p className="text-xs text-muted">{desc}</p>
                </div>
                <button
                  onClick={() => {
                    setNotifs((p) => ({ ...p, [key]: !p[key] }));
                    // TODO (Backend): PATCH /api/profile — save notification preferences
                    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
                  }}
                  aria-pressed={notifs[key]}
                  aria-label={`Toggle ${label}`}
                  className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors ${notifs[key] ? 'bg-gold' : 'bg-divider'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifs[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Danger zone */}
        <section className="card border-danger/30">
          <h2 className="font-display text-xl text-danger mb-4">Danger Zone</h2>
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleLogout} className="btn-secondary" aria-label="Sign out">Sign Out</button>
            <button onClick={() => setDeleteOpen(true)} className="btn-danger" aria-label="Delete account">
              <Trash2 size={15} /> Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Delete confirmation */}
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Account">
        <p className="text-sm text-taupe mb-6 leading-relaxed">
          This will permanently delete your account, wardrobe, and all saved outfits. This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setDeleteOpen(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleDeleteAccount} className="btn-danger">Yes, Delete My Account</button>
        </div>
      </Modal>
    </PageWrapper>
  );
}
