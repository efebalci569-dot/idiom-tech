import { createContext, useContext, type ReactNode } from 'react';
import { useFavorites } from '../hooks/useFavorites';

type FavoritesApi = ReturnType<typeof useFavorites>;

const FavoritesContext = createContext<FavoritesApi | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const api = useFavorites();
  return (
    <FavoritesContext.Provider value={api}>{children}</FavoritesContext.Provider>
  );
}

export function useFavoritesContext(): FavoritesApi {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext must be used inside FavoritesProvider');
  return ctx;
}
