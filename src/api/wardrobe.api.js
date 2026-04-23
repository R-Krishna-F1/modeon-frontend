// src/api/wardrobe.api.js
// All functions are stubs. Replace with real fetch/axios calls when backend is ready.

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/wardrobe/upload
 * Accepts: multipart/form-data with one or more image files (max 20, max 10 MB each)
 * Process: validates type/size → uploads to Azure Blob (wardrobe-originals) →
 *          runs rembg background removal + CV tagging pipeline (async) →
 *          stores thumbnail in wardrobe-thumbnails container →
 *          inserts row(s) into wardrobe_items table in Supabase →
 *          returns short-lived SAS URLs (30-min expiry) for immediate display
 * Returns: Array<{ item_id, blob_path, thumbnail_sas_url, category, colours, pattern, formality, seasons }>
 */
export async function uploadWardrobeItems(files) {
  console.warn('uploadWardrobeItems: backend not connected');
  return [];
}

/**
 * TODO (Backend): GET /api/wardrobe
 * Query params: page, limit, category, colour, season, formality, laundry
 * Returns: { items: WardrobeItem[], total: number, nextCursor: string | null }
 * Each item includes a fresh 30-min SAS thumbnail URL.
 */
export async function getWardrobe(filters = {}) {
  console.warn('getWardrobe: backend not connected');
  return { items: [], total: 0, nextCursor: null };
}

/**
 * TODO (Backend): DELETE /api/wardrobe/{item_id}
 * Soft-deletes the item (sets archived_at timestamp in Supabase).
 * Does NOT delete the Azure Blob immediately (retention job handles that).
 */
export async function deleteWardrobeItem(itemId) {
  console.warn('deleteWardrobeItem: backend not connected');
  return null;
}

/**
 * TODO (Backend): PATCH /api/wardrobe/{item_id}/tag
 * Body: { category, colours, seasons, formality, customTags }
 * Updates tag columns in wardrobe_items table. Returns updated item.
 */
export async function tagWardrobeItem(itemId, tags) {
  console.warn('tagWardrobeItem: backend not connected');
  return null;
}

/**
 * TODO (Backend): GET /api/wardrobe/{item_id}/sas
 * Generates a fresh 30-minute SAS token for the item's thumbnail blob.
 * Returns: { thumbnail_sas_url }
 */
export async function refreshItemSasUrl(itemId) {
  console.warn('refreshItemSasUrl: backend not connected');
  return null;
}
