// src/hooks/useShoppingList.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getShoppingList, addToShoppingList, deleteFromShoppingList, moveToWardrobe } from '@/api/shoppingList.api';
import useUIStore from '@/stores/useUIStore';
import { trackEvent } from '@/lib/posthog';

export const SHOPPING_LIST_KEY = ['shoppingList'];

export function useShoppingList() {
  return useQuery({
    queryKey: SHOPPING_LIST_KEY,
    queryFn:  getShoppingList,
  });
}

export function useAddToShoppingList() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);
  return useMutation({
    mutationFn: (uploadId) => addToShoppingList(uploadId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SHOPPING_LIST_KEY });
      addToast({ type: 'success', message: 'Item added to Shopping List.' });
      trackEvent('shopping_item_saved');
    },
    onError: () => addToast({ type: 'error', message: 'Feature coming soon — backend not connected' }),
  });
}

export function useDeleteFromShoppingList() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);
  return useMutation({
    mutationFn: (itemId) => deleteFromShoppingList(itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: SHOPPING_LIST_KEY }),
    onError: () => addToast({ type: 'error', message: 'Feature coming soon — backend not connected' }),
  });
}

export function useMoveToWardrobe() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);
  return useMutation({
    mutationFn: (itemId) => moveToWardrobe(itemId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SHOPPING_LIST_KEY });
      addToast({ type: 'success', message: 'Item moved to Wardrobe!' });
      trackEvent('shopping_list_item_moved_to_wardrobe');
    },
    onError: () => addToast({ type: 'error', message: 'Feature coming soon — backend not connected' }),
  });
}
