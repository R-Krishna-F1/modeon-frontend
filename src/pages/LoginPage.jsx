// src/pages/LoginPage.jsx
import { useState }    from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion }      from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { ROUTES }      from '@/constants/routes';
import useAuthStore    from '@/stores/useAuthStore';
import useUIStore      from '@/stores/useUIStore';
import { login, loginWithMicrosoft } from '@/api/auth.api';
import { trackEvent }  from '@/lib/posthog';

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 21 21">
    <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
    <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

function validatePassword(pw) {
  const errors = [];
  if (pw.length < 8)       errors.push('At least 8 characters');
  if (!/[A-Z]/.test(pw))   errors.push('One uppercase letter');
  if (!/[0-9]/.test(pw))   errors.push('One number');
  return errors;
}

export default function LoginPage() {
  const navigate    = useNavigate();
  const setSession  = useAuthStore((s) => s.setSession);
  const addToast    = useUIStore((s) => s.addToast);

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [errors,   setErrors]   = useState([]);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwErrors = validatePassword(password);
    if (pwErrors.length) { setErrors(pwErrors); return; }
    setErrors([]);
    setLoading(true);
    try {
      // TODO (Backend): POST /api/auth/login via Supabase signInWithPassword
      await login({ email, password });
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
      // On success: setSession(session); navigate(ROUTES.DASHBOARD);
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoft = async () => {
    // TODO (Backend): initiate Supabase Microsoft OAuth 2.0 flow
    await loginWithMicrosoft();
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  // Demo bypass — remove when backend is live
  const handleDemoLogin = () => {
    setSession({ user: { id: 'demo', email: 'sara@modeon.app', user_metadata: { full_name: 'Sara Collins' } } });
    trackEvent('user_registered', { method: 'demo' });
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-[420px] text-center"
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-white font-bold text-3xl leading-none">M</span>
          </div>
          <h1 className="font-display text-4xl mb-1">Modeon</h1>
          <p className="text-muted italic text-sm">Your wardrobe, reimagined.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left" noValidate>
          {/* Microsoft SSO */}
          <button type="button" onClick={handleMicrosoft} className="btn-secondary w-full justify-center">
            <MicrosoftIcon /> Sign in with Microsoft
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-divider" />
            <span className="text-2xs text-muted font-bold tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-divider" />
          </div>

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
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input
                id="password" type="password" required
                value={password} onChange={(e) => { setPassword(e.target.value); setErrors([]); }}
                placeholder="••••••••"
                className="input pl-10"
                aria-label="Password"
                autoComplete="current-password"
              />
            </div>
            {errors.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1">
                {errors.map((e) => (
                  <li key={e} className="text-xs text-danger">• {e}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="text-right">
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-gold hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            <LogIn size={15} /> {loading ? 'Signing in…' : 'Sign In'}
          </button>

          {/* Demo bypass */}
          <button type="button" onClick={handleDemoLogin} className="btn-ghost w-full justify-center text-muted">
            Continue with Demo Account →
          </button>
        </form>

        <p className="text-sm text-muted mt-6">
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-gold font-semibold hover:underline">Sign up free</Link>
        </p>
      </motion.div>
    </div>
  );
}
