// src/components/outfits/OutfitExportModal.jsx
import { Download, Link2 } from 'lucide-react';
import Modal   from '@/components/ui/Modal';
import useUIStore from '@/stores/useUIStore';
// TODO (Backend): GET /api/outfits/{id}/export — Pillow-composed PNG
// TODO (Backend): POST /api/outfits/{id}/share — generate 30-day share token

export default function OutfitExportModal({ open, onClose, outfit }) {
  const addToast = useUIStore((s) => s.addToast);

  const handleDownload = () => {
    // TODO (Backend): GET /api/outfits/{outfit.id}/export
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  const handleCopyLink = () => {
    // TODO (Backend): POST /api/outfits/{outfit.id}/share
    addToast({ type: 'info', message: 'Feature coming soon — backend not connected' });
  };

  return (
    <Modal open={open} onClose={onClose} title="Export Outfit">
      <p className="text-sm text-muted mb-6">
        Download your outfit as an image or copy a shareable link (valid 30 days).
      </p>
      <div className="flex flex-col gap-3">
        <button onClick={handleDownload} className="btn-primary w-full justify-center">
          <Download size={16} /> Download as Image
        </button>
        <button onClick={handleCopyLink} className="btn-secondary w-full justify-center">
          <Link2 size={16} /> Copy Share Link
        </button>
      </div>
    </Modal>
  );
}
