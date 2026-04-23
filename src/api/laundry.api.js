// src/api/laundry.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): PATCH /api/wardrobe/{item_id}/laundry
 * Body: { inLaundry: boolean }
 * Toggles the in_laundry flag on wardrobe_items. Returns updated item.
 */
export async function toggleLaundry(itemId, inLaundry) {
  console.warn('toggleLaundry: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/wardrobe/laundry/bulk
 * Body: { item_ids: string[], inLaundry: boolean }
 * Bulk-updates in_laundry for multiple items. Returns { updated: number }.
 */
export async function bulkLaundry(itemIds, inLaundry) {
  console.warn('bulkLaundry: backend not connected');
  return null;
}
