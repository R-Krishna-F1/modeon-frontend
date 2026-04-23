// src/api/swipeSession.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): GET /api/outfits/swipe-session
 * Generates 10–15 outfit combinations from the user's available (non-laundry) wardrobe,
 * ranked by swipe history and style profile (preference_engine service).
 * Returns: Array<GeneratedOutfit>
 */
export async function getSwipeSession() {
  console.warn('getSwipeSession: backend not connected');
  return [];
}

/**
 * TODO (Backend): POST /api/outfits/swipe
 * Body: { outfit_id: string, direction: 'like' | 'dislike' | 'save' }
 * Records the swipe in outfit_swipes table. Used by preference engine.
 */
export async function recordSwipe(outfitId, direction) {
  console.warn('recordSwipe: backend not connected');
  return null;
}
