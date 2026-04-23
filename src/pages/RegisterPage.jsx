// src/pages/RegisterPage.jsx
import { useState }       from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion }         from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { ROUTES }         from '@/constants/routes';
import useUIStore         from '@/stores/useUIStore';
import { register }       from '@/api/auth.api';
import { trackEvent }     from '@/lib/posthog';

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 21 21">
    <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
    <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const addToast = useUIStore((s) => s.addToast);

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim())              e.name     = 'Name is required';
    if (!email.includes('@'))      e.email    = 'Valid email required';
    if (password.length < 8)       e.password = 'Min 8 characters';
    if (!/[A-Z]/.test(password))   e.password = (e.password ? e.password + ', ' : '') + 'one uppercase';
    if (!/[0-9]/.test(password))   e.password = (e.password ? e.password + ', ' : '') + 'one number';
    if (password !== confirm)      e.confirm  = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      // TODO (Backend): POST /api/auth/register — create Supabase Auth user, send verification email
      await register({ email, password, displayName: name });
      trackEvent('user_registered', { method: 'email' });
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
      // On success: navigate(ROUTES.ONBOARDING);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-[440px] text-center"
      >
        <div className="mb-8">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-white font-bold text-3xl leading-none">M</span>
          </div>
          <h1 className="font-display text-3xl mb-1">Create your account</h1>
          <p className="text-muted italic text-sm">Free forever. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left" noValidate>
          <button type="button" className="btn-secondary w-full justify-center">
            <MicrosoftIcon /> Sign up with Microsoft
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-divider" />
            <span className="text-2xs text-muted font-bold tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-divider" />
          </div>

          {[
            { id: 'name',     label: 'Full Name',       icon: User, type: 'text',     val: name,     set: setName,     err: errors.name,     ph: 'Sara Collins',      auto: 'name' },
            { id: 'email',    label: 'Email',            icon: Mail, type: 'email',    val: email,    set: setEmail,    err: errors.email,    ph: 'you@example.com',   auto: 'email' },
            { id: 'password', label: 'Password',         icon: Lock, type: 'password', val: password, set: setPassword, err: errors.password, ph: '••••••••',           auto: 'new-password' },
            { id: 'confirm',  label: 'Confirm Password', icon: Lock, type: 'password', val: confirm,  set: setConfirm,  err: errors.confirm,  ph: '••••••••',           auto: 'new-password' },
          ].map(({ id, label, icon: Icon, type, val, set, err, ph, auto }) => (
            <div key={id}>
              <label htmlFor={id} className="label">{label}</label>
              <div className="relative">
                <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  id={id} type={type} value={val}
                  onChange={(e) => { set(e.target.value); setErrors((prev) => ({ ...prev, [id]: undefined })); }}
                  placeholder={ph} className="input pl-10" aria-label={label}
                  autoComplete={auto}
                />
              </div>
              {err && <p className="text-xs text-danger mt-1">• {err}</p>}
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-2">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-muted mt-6">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-gold font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
