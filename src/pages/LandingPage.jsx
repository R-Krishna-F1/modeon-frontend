// src/pages/LandingPage.jsx
import { useNavigate }    from 'react-router-dom';
import { motion }         from 'framer-motion';
import { Sparkles, Shirt, ShoppingBag, ArrowRight } from 'lucide-react';
import { ROUTES }         from '@/constants/routes';
import { PricingCard }    from '@/components/subscription/PricingCard';

const FEATURES = [
  {
    icon: Shirt,
    title:       'Wardrobe Intelligence',
    description: 'Upload your clothes once. AI tags, categorises, and tracks laundry status automatically.',
  },
  {
    icon: Sparkles,
    title:       'Swipe Learning',
    description: 'Like or skip outfit suggestions. Every swipe trains your personal style model.',
  },
  {
    icon: ShoppingBag,
    title:       'Smarter Shopping',
    description: 'Before you buy, see if it works with what you already own. Stop wasting money.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-canvas">
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-divider">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
            <span className="font-display text-white font-bold text-lg leading-none">M</span>
          </div>
          <span className="font-display font-bold text-xl text-ink">Modeon</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate(ROUTES.LOGIN)}    className="btn-secondary">Sign In</button>
          <button onClick={() => navigate(ROUTES.REGISTER)} className="btn-gold">Get Started Free</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-28 px-10 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge mb-6 inline-block">AI-Powered Fashion</span>
          <h1 className="font-display text-6xl md:text-7xl text-ink leading-tight mb-6">
            Your AI Fashion<br />Advisor
          </h1>
          <p className="text-lg text-taupe max-w-xl mx-auto mb-10 leading-relaxed">
            Modeon turns your wardrobe into a personal style system — AI-generated outfits, smarter shopping decisions, and a closet you'll actually use.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate(ROUTES.REGISTER)} className="btn-gold text-sm px-8 py-4">
              Get Started Free <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate(ROUTES.LOGIN)}    className="btn-secondary text-sm px-8 py-4">
              Sign In
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-10 max-w-6xl mx-auto">
        <h2 className="font-display text-4xl text-center text-ink mb-14">Everything your wardrobe needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="w-14 h-14 bg-gold/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Icon size={26} className="text-gold" />
              </div>
              <h3 className="font-display text-2xl mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-10 max-w-4xl mx-auto">
        <h2 className="font-display text-4xl text-center text-ink mb-4">Simple pricing</h2>
        <p className="text-muted text-center mb-12">Start free. Upgrade when you're ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PricingCard plan="free"    />
          <PricingCard plan="premium" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider py-10 px-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
            <span className="font-display text-white font-bold text-sm leading-none">M</span>
          </div>
          <span className="font-display font-bold text-lg text-ink">Modeon</span>
        </div>
        <p className="text-sm text-muted">© {new Date().getFullYear()} Modeon. Dress better, waste less.</p>
      </footer>
    </div>
  );
}
