// src/api/shoppingList.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/shopping-list/add
 * Body: { upload_id: string }
 * Inserts into shopping_list_items table. Returns created item row.
 */
export async function addToShoppingList(uploadId) {
  console.warn('addToShoppingList: backend not connected');
  return null;
}

/**
 * TODO (Backend): GET /api/shopping-list
 * Returns: Array<ShoppingListItem> for the current user.
 */
export async function getShoppingList() {
  console.warn('getShoppingList: backend not connected');
  return [];
}

/**
 * TODO (Backend): DELETE /api/shopping-list/{item_id}
 * Removes item from shopping_list_items.
 */
export async function deleteFromShoppingList(itemId) {
  console.warn('deleteFromShoppingList: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/shopping-list/{item_id}/move-to-wardrobe
 * Runs CV tagging pipeline on the item image →
 * inserts row into wardrobe_items → removes from shopping_list_items.
 * Returns: newly created wardrobe item.
 */
export async function moveToWardrobe(itemId) {
  console.warn('moveToWardrobe: backend not connected');
  return null;
}
