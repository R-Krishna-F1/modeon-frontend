// src/api/shopping.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/shopping/upload
 * Accepts: multipart/form-data with a single shopping item image.
 * Process: uploads to Azure Blob (shopping-uploads) → optional CV tagging.
 * Returns: { upload_id, blob_path, thumbnail_sas_url, tags }
 */
export async function uploadShoppingItem(file) {
  console.warn('uploadShoppingItem: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/shopping/compare
 * Body: { upload_id: string }
 * Validates free-tier quota (5 comparisons/month).
 * Calls Azure OpenAI GPT-4o with uploaded item + wardrobe metadata.
 * Returns: { result: 'compatible' | 'not_compatible', explanation: string, matching_items: string[] }
 */
export async function compareWithWardrobe(uploadId) {
  console.warn('compareWithWardrobe: backend not connected');
  return null;
}
