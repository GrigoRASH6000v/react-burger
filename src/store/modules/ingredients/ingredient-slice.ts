import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type { Ingredient } from '@/types/Ingredient';

type IngredientState = {
  list: Ingredient[];
};

const initialState: IngredientState = {
  list: [],
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state: IngredientState, action: PayloadAction<Ingredient[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setIngredients } = ingredientSlice.actions;

export const selectIngredients = (state: RootState): Ingredient[] =>
  state.ingredients.list;

export const selectIngredentsById =
  (id: string) =>
  (state: RootState): Ingredient | null =>
    state.ingredients.list.find((ingredient: Ingredient) => ingredient._id === id) ??
    null;

export default ingredientSlice.reducer;
