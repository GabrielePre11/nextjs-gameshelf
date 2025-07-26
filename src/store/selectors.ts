import { RootState } from "./store";

export const selectfavorites = (state: RootState) => state.favorites.favorites;

export const selectFavoritesCount = (state: RootState) =>
  state.favorites.favorites.length;

export const isAlreadyOnFavorites = (state: RootState, gameId: number) =>
  state.favorites.favorites.some((game) => game.id === gameId);
