// src/pages/ForgotPasswordPage.jsx
import { useState }  from 'react';
import { Link }      from 'react-router-dom';
import { motion }    from 'framer-motion';
import { Mail }      from 'lucide-react';
import { ROUTES }    from '@/constants/routes';
import useUIStore    from '@/stores/useUIStore';
import { resetPassword } from '@/api/auth.api';

export default function ForgotPasswordPage() {
  const addToast = useUIStore((s) => s.addToast);
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    try {
      // TODO (Backend): POST /api/auth/reset-password via Supabase resetPasswordForEmail
      await resetPassword({ email });
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-[400px] text-center">
        <div className="w-14 h-14 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-5">
          <Mail size={26} className="text-gold" />
        </div>
        <h1 className="font-display text-3xl mb-2">Reset your password</h1>
        <p className="text-muted text-sm mb-8">Enter your email and we'll send a reset link.</p>

        {sent ? (
          <div className="bg-ok/10 border border-ok/30 rounded-2xl p-5 text-ok font-medium text-sm">
            Check your inbox — a reset link is on its way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  id="email" type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-10"
                  aria-label="Email address"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <Link to={ROUTES.LOGIN} className="inline-block mt-6 text-sm text-gold font-semibold hover:underline">
          ← Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}
