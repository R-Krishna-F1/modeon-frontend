// src/hooks/useOutfits.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSavedOutfits, saveOutfit, rateOutfit, deleteOutfit, generateOutfit } from '@/api/outfits.api';
import useUIStore from '@/stores/useUIStore';
import { trackEvent } from '@/lib/posthog';

export const OUTFITS_KEY = ['outfits'];

export function useSavedOutfits(page = 1) {
  return useQuery({
    queryKey: [...OUTFITS_KEY, page],
    queryFn:  () => getSavedOutfits(page),
  });
}

export function useGenerateOutfit() {
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (params) => generateOutfit(params),
    onSuccess: () => {
      // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
      trackEvent('outfit_generated');
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}

export function useSaveOutfit() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: ({ outfitId, meta }) => saveOutfit(outfitId, meta),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OUTFITS_KEY });
      addToast({ type: 'success', message: 'Outfit saved!' });
      // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
      trackEvent('outfit_saved');
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}

export function useRateOutfit() {
  return useMutation({
    mutationFn: ({ outfitId, rating }) => rateOutfit(outfitId, rating),
    onSuccess: (_, { rating }) => {
      // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
      trackEvent('outfit_rated', { rating });
    },
  });
}

export function useDeleteOutfit() {
  const qc       = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation({
    mutationFn: (outfitId) => deleteOutfit(outfitId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OUTFITS_KEY });
      addToast({ type: 'success', message: 'Outfit removed.' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Feature coming soon — backend not connected' });
    },
  });
}
