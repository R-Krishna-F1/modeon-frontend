// src/api/export.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): GET /api/outfits/{outfit_id}/export
 * Uses Pillow (export_composer service) to compose a branded PNG card
 * from the outfit's item thumbnail SAS URLs.
 * Premium users get a watermark-free export; free users get a Modeon watermark.
 * Returns: { image_url: string } — a pre-signed download URL (valid 5 min).
 */
export async function exportOutfit(outfitId) {
  console.warn('exportOutfit: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/outfits/{outfit_id}/share
 * Creates a share token (UUID) in outfit_shares table with a 30-day expiry.
 * Returns: { share_url: string } — e.g. https://modeon.app/share/{token}
 */
export async function shareOutfit(outfitId) {
  console.warn('shareOutfit: backend not connected');
  return null;
}
