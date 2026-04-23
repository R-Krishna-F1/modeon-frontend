// src/hooks/useLaundry.js

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLaundry, bulkLaundry } from '@/api/laundry.api';
import useWardrobeStore from '@/stores/useWardrobeStore';
import useUIStore from '@/stores/useUIStore';
import { WARDROBE_KEY } from '@/hooks/useWardrobe';
import { trackEvent } from '@/lib/posthog';

export function useToggleLaundry() {
  const qc         = useQueryClient();
  const upsertItem = useWardrobeStore((s) => s.upsertItem);
  const addToast   = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: ({ itemId, inLaundry }) => toggleLaundry(itemId, inLaundry),
    onMutate: ({ itemId, inLaundry }) => {
      // Optimistic update
      upsertItem({ id: itemId, inLaundry });
    },
    onSuccess: (_, { inLaundry }) => {
      qc.invalidateQueries({ queryKey: WARDROBE_KEY });
      // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
      trackEvent(inLaundry ? 'laundry_item_marked' : 'laundry_item_unmarked');
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}

export function useBulkLaundry() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: ({ itemIds, inLaundry }) => bulkLaundry(itemIds, inLaundry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: WARDROBE_KEY });
      addToast({ type: 'success', message: 'Laundry status updated.' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}
