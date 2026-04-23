// src/api/shoppingListOutfits.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/shopping-list/outfits/generate
 * Fetches the user's shopping_list_items + wardrobe_items metadata.
 * Calls Azure OpenAI GPT-4o to generate outfit combinations featuring
 * one or more shopping list items.
 * Free tier: max 3 combinations. Premium: max 10.
 * Returns: Array<GeneratedOutfit>
 */
export async function generateShoppingListOutfits() {
  console.warn('generateShoppingListOutfits: backend not connected');
  return [];
}
