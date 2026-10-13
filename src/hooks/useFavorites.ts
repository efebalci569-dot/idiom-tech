import { useCallback, useEffect, useState } from 'react';
import type { FavoriteKind, FavoriteRef } from '../types';
import { favoriteKey } from '../utils/search';

const STORAGE_KEY = 'idiom-tech:favorites:v1';

function loadFavorites(): FavoriteRef[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is FavoriteRef =>
        typeof item === 'object' &&
        item !== null &&
        ((item as FavoriteRef).kind === 'word' ||
          (item as FavoriteRef).kind === 'idiom' ||
          (item as FavoriteRef).kind === 'phrasal') &&
        typeof (item as FavoriteRef).id === 'string',
    );
  } catch {
    // Corrupt or unavailable storage: start empty instead of crashing.
    return [];
  }
}

/**
 * Favorites persisted in localStorage (same browser only).
 * Words and expressions are stored with a kind tag so the two
 * categories never mix on the Favorites page.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRef[]>(() => loadFavorites());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage full or blocked (private mode): keep in-memory state.
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (kind: FavoriteKind, id: string) =>
      favorites.some((f) => f.kind === kind && f.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((kind: FavoriteKind, id: string) => {
    setFavorites((prev) =>
      prev.some((f) => f.kind === kind && f.id === id)
        ? prev.filter((f) => !(f.kind === kind && f.id === id))
        : [...prev, { kind, id }],
    );
  }, []);

  const favoritesByKind = useCallback(
    (kind: FavoriteKind) => favorites.filter((f) => f.kind === kind).map((f) => f.id),
    [favorites],
  );

  return { favorites, isFavorite, toggleFavorite, favoritesByKind, favoriteKey };
}
