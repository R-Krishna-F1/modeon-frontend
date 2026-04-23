// src/api/outfits.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/outfits/generate
 * Body: { occasion?, regenerate?: boolean }
 * Validates free-tier limit (1 daily suggestion + 1 retry for free users).
 * Calls Azure OpenAI GPT-4o with wardrobe metadata + style profile.
 * Returns: GeneratedOutfit { outfit_id, item_ids, item_thumbnails, explanation }
 */
export async function generateOutfit(params = {}) {
  console.warn('generateOutfit: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/outfits/{outfit_id}/save
 * Body: { occasion?, name? }
 * Inserts into generated_outfits table with saved_at timestamp.
 * Returns: saved outfit row.
 */
export async function saveOutfit(outfitId, meta = {}) {
  console.warn('saveOutfit: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/outfits/{outfit_id}/rate
 * Body: { rating: 'like' | 'dislike' }
 * Records rating in outfit_ratings table for preference engine training.
 */
export async function rateOutfit(outfitId, rating) {
  console.warn('rateOutfit: backend not connected');
  return null;
}

/**
 * TODO (Backend): GET /api/outfits
 * Returns: paginated list of saved outfits for the current user.
 */
export async function getSavedOutfits(page = 1) {
  console.warn('getSavedOutfits: backend not connected');
  return { outfits: [], total: 0 };
}

/**
 * TODO (Backend): DELETE /api/outfits/{outfit_id}
 * Soft-deletes the saved outfit.
 */
export async function deleteOutfit(outfitId) {
  console.warn('deleteOutfit: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/outfits/occasion
 * Body: { occasion: string, description?: string }
 * Requires Premium subscription (validated server-side via JWT claims).
 * Returns: Array<GeneratedOutfit> (3–5 results).
 */
export async function getOccasionOutfits(occasion, description = '') {
  console.warn('getOccasionOutfits: backend not connected');
  return [];
}

/**
 * TODO (Backend): POST /api/outfits/score
 * Body: { item_ids: string[] }
 * Calls Azure OpenAI GPT-4o with item metadata to score compatibility.
 * Returns: { score: number (0–100), explanation: string }
 */
export async function scoreOutfit(itemIds) {
  console.warn('scoreOutfit: backend not connected');
  return { score: 0, explanation: '' };
}
