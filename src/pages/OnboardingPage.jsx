// src/pages/OnboardingPage.jsx
import { useState }       from 'react';
import { useNavigate }    from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ROUTES }         from '@/constants/routes';
import { STYLE_ARCHETYPES } from '@/constants/styleArchetypes';
import { OCCASIONS }      from '@/constants/occasions';
import ProgressBar        from '@/components/ui/ProgressBar';
import useUIStore         from '@/stores/useUIStore';
import { trackEvent }     from '@/lib/posthog';

const GENDER_OPTIONS    = ["Women's", "Men's", 'Non-binary / Gender-fluid', 'Prefer not to say'];
const COLOUR_PALETTES   = [
  { label: 'Neutral & Earthy',  swatches: ['#EDE8DF', '#8C7B6B', '#1C1916', '#C8A97E'] },
  { label: 'Cool Monochromes', swatches: ['#F0F0F2', '#B0B8C4', '#4A5568', '#1A202C'] },
  { label: 'Warm & Bold',      swatches: ['#FFF3E0', '#FFA726', '#E64A19', '#BF360C'] },
  { label: 'Soft Pastels',     swatches: ['#FCE4EC', '#F48FB1', '#CE93D8', '#80DEEA'] },
];

const STEPS = [
  { id: 'gender',      title: 'How do you shop?',             subtitle: 'This helps us filter relevant pieces.' },
  { id: 'archetype',   title: 'Pick your style archetype',    subtitle: 'Choose the one that feels most like you.' },
  { id: 'occasions',   title: 'What occasions do you dress for?', subtitle: 'Select all that apply.' },
  { id: 'palette',     title: 'Your colour palette',          subtitle: 'Pick the tones you gravitate toward.' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const addToast = useUIStore((s) => s.addToast);
  const [step,   setStep]    = useState(0);
  const [answers, setAnswers] = useState({ gender: '', archetype: '', occasions: [], palette: '' });

  const current     = STEPS[step];
  const progress    = ((step) / STEPS.length) * 100;
  const isLast      = step === STEPS.length - 1;

  const canContinue = () => {
    if (current.id === 'gender')    return !!answers.gender;
    if (current.id === 'archetype') return !!answers.archetype;
    if (current.id === 'occasions') return answers.occasions.length > 0;
    if (current.id === 'palette')   return !!answers.palette;
    return true;
  };

  const next = () => {
    trackEvent('onboarding_step_completed', { step: current.id, step_index: step });
    if (isLast) finish();
    else setStep((s) => s + 1);
  };

  const finish = async () => {
    // TODO (Backend): POST /api/profile — save user_profiles row to Supabase with answers
    trackEvent('onboarding_complete', answers);
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    navigate(ROUTES.DASHBOARD);
  };

  const toggle = (key, val) => {
    setAnswers((prev) => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar value={progress} />
          <p className="text-2xs text-muted font-bold tracking-widest uppercase mt-2">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-4xl mb-2">{current.title}</h2>
            <p className="text-muted text-sm mb-8">{current.subtitle}</p>

            {/* Gender */}
            {current.id === 'gender' && (
              <div className="grid grid-cols-2 gap-3">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers((p) => ({ ...p, gender: opt }))}
                    className={`rounded-2xl border p-4 text-left font-medium text-sm transition-all
                      ${answers.gender === opt ? 'border-gold bg-gold/10 text-gold' : 'border-divider bg-card text-taupe hover:border-gold/50'}`}
                    aria-pressed={answers.gender === opt}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Archetype */}
            {current.id === 'archetype' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {STYLE_ARCHETYPES.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAnswers((p) => ({ ...p, archetype: a.value }))}
                    className={`rounded-2xl border p-4 text-center transition-all
                      ${answers.archetype === a.value ? 'border-gold bg-gold/10' : 'border-divider bg-card hover:border-gold/50'}`}
                    aria-pressed={answers.archetype === a.value}
                  >
                    <div className="text-3xl mb-2">{a.emoji}</div>
                    <p className="font-bold text-sm text-ink">{a.label}</p>
                    <p className="text-2xs text-muted mt-1 leading-relaxed">{a.description}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Occasions */}
            {current.id === 'occasions' && (
              <div className="flex flex-wrap gap-3">
                {OCCASIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => toggle('occasions', o.value)}
                    className={`flex items-center gap-2 rounded-chip border px-4 py-2.5 text-sm font-medium transition-all
                      ${answers.occasions.includes(o.value) ? 'border-gold bg-gold/10 text-gold' : 'border-divider bg-card text-taupe hover:border-gold/50'}`}
                    aria-pressed={answers.occasions.includes(o.value)}
                  >
                    <span>{o.icon}</span> {o.label}
                  </button>
                ))}
              </div>
            )}

            {/* Palette */}
            {current.id === 'palette' && (
              <div className="grid grid-cols-2 gap-4">
                {COLOUR_PALETTES.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setAnswers((prev) => ({ ...prev, palette: p.label }))}
                    className={`rounded-2xl border p-4 text-left transition-all
                      ${answers.palette === p.label ? 'border-gold bg-gold/10' : 'border-divider bg-card hover:border-gold/50'}`}
                    aria-pressed={answers.palette === p.label}
                  >
                    <div className="flex gap-2 mb-3">
                      {p.swatches.map((sw) => (
                        <div key={sw} className="w-8 h-8 rounded-full border border-white/40" style={{ background: sw }} />
                      ))}
                    </div>
                    <p className="font-bold text-sm text-ink">{p.label}</p>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn-secondary" aria-label="Previous step">
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <button onClick={finish} className="btn-ghost text-muted" aria-label="Skip onboarding">
              Skip
            </button>
          </div>
          <button
            onClick={next}
            disabled={!canContinue()}
            className="btn-gold"
            aria-label={isLast ? 'Finish onboarding' : 'Continue to next step'}
          >
            {isLast ? 'All done!' : 'Continue'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
