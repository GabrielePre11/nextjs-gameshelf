import { CompleteGame } from "@/types/complete_game";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: CompleteGame[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    addToFavorites: (state, action: PayloadAction<CompleteGame>) => {
      const alreadyExists = state.favorites.some(
        (game) => game.id === action.payload.id
      );

      if (!alreadyExists) {
        state.favorites.push(action.payload);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (game) => game.id !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
