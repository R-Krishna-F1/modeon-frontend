// src/pages/OutfitCheckPage.jsx
import { useState }              from 'react';
import PageWrapper               from '@/components/layout/PageWrapper';
import PremiumLock               from '@/components/ui/PremiumLock';
import { OutfitCheckUploader }   from '@/components/outfitcheck/OutfitCheckUploader';
import { OutfitCheckResult }     from '@/components/outfitcheck/OutfitCheckResult';
import { OutfitCheckHistory }    from '@/components/outfitcheck/OutfitCheckHistory';

import useUIStore                from '@/stores/useUIStore';
import { submitOutfitCheck }     from '@/api/outfitCheck.api';
// TODO (Backend): POST /api/outfit-check — upload photo; GPT-4o Vision analysis
// TODO (Backend): GET /api/outfit-check/history — paginated check history

const MOCK_HISTORY = [
  { check_id: 'h1', overall_score: 8, summary: 'Strong colour harmony with excellent occasion alignment. Minor fit notes on the trousers.', checked_at: '20 Apr 2026' },
  { check_id: 'h2', overall_score: 6, summary: 'Good individual pieces but the palette clashes slightly. Consider swapping the accessories.', checked_at: '15 Apr 2026' },
];

export default function OutfitCheckPage() {
  
  const addToast   = useUIStore((s) => s.addToast);
  const [result,   setResult]   = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tab,      setTab]      = useState('check'); // 'check' | 'history'

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setResult(null);
    try {
      // TODO (Backend): POST /api/outfit-check
      await submitOutfitCheck(file);
      // Stub mock result
      setResult({
        overall_score:   7,
        summary:         'A well-balanced look with a clean palette. The proportions work nicely for a smart-casual occasion.',
        colour_harmony:  { score: 8, feedback: 'The neutral base and warm accent tones complement each other harmoniously.' },
        fit_proportion:  { score: 7, feedback: 'Good silhouette overall. The waistline definition could be slightly more pronounced.' },
        occasion_match:  { score: 7, feedback: 'Perfect for smart-casual and business settings. May be slightly informal for black-tie events.' },
      });
      addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageWrapper>
      <header className="mb-10">
        <h1 className="font-display text-5xl mb-1">Outfit Check</h1>
        <p className="text-sm text-muted italic">Upload a photo and get AI feedback on your look.</p>
      </header>

      <PremiumLock>
        {/* Tabs */}
        <div className="flex gap-1 bg-surface rounded-2xl p-1 w-fit mb-8">
          {['check', 'history'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide capitalize transition-all
                ${tab === t ? 'bg-card shadow-card text-ink' : 'text-muted hover:text-ink'}`}
              aria-pressed={tab === t}
            >
              {t === 'check' ? 'New Check' : 'History'}
            </button>
          ))}
        </div>

        {tab === 'check' && (
          <div className="flex flex-col gap-8 max-w-2xl">
            <OutfitCheckUploader onFile={handleFile} uploading={uploading} />
            {result && <OutfitCheckResult result={result} />}
          </div>
        )}

        {tab === 'history' && (
          <div className="max-w-2xl">
            <OutfitCheckHistory checks={MOCK_HISTORY} />
          </div>
        )}
      </PremiumLock>
    </PageWrapper>
  );
}
