// src/hooks/useWardrobe.js
// React Query hook for fetching and managing wardrobe items.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWardrobe, deleteWardrobeItem, tagWardrobeItem } from '@/api/wardrobe.api';
import useWardrobeStore from '@/stores/useWardrobeStore';
import useUIStore from '@/stores/useUIStore';

export const WARDROBE_KEY = ['wardrobe'];

export function useWardrobe(filters = {}) {
  const { setItems } = useWardrobeStore();
  const addToast     = useUIStore((s) => s.addToast);

  const query = useQuery({
    queryKey: [...WARDROBE_KEY, filters],
    queryFn:  () => getWardrobe(filters),
    onSuccess: (data) => setItems(data.items ?? []),
  });

  return query;
}

export function useDeleteWardrobeItem() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (itemId) => deleteWardrobeItem(itemId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WARDROBE_KEY });
      addToast({ type: 'success', message: 'Item removed from wardrobe.' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}

export function useTagWardrobeItem() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: ({ itemId, tags }) => tagWardrobeItem(itemId, tags),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WARDROBE_KEY });
      addToast({ type: 'success', message: 'Tags updated.' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}
