// src/api/outfitCheck.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/outfit-check
 * Accepts: multipart/form-data with a single outfit photo (max 10 MB).
 * Process: uploads to Azure Blob (outfit-checks container) →
 *          calls Azure OpenAI GPT-4o Vision with the image →
 *          returns structured JSON feedback.
 * Returns: {
 *   check_id, image_sas_url,
 *   colour_harmony: { score, feedback },
 *   fit_proportion: { score, feedback },
 *   occasion_match: { score, feedback },
 *   overall_score: number (1–10),
 *   summary: string
 * }
 */
export async function submitOutfitCheck(file) {
  console.warn('submitOutfitCheck: backend not connected');
  return null;
}

/**
 * TODO (Backend): GET /api/outfit-check/history
 * Query params: page, limit
 * Returns: paginated list of past outfit checks with SAS image URLs.
 */
export async function getOutfitCheckHistory(page = 1) {
  console.warn('getOutfitCheckHistory: backend not connected');
  return { checks: [], total: 0 };
}
