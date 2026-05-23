import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
  selectors: {
    selectIngredients: (state: IngredientState) => state.list,
    selectIngredientsById:
      (state: IngredientState) =>
      (id: string): Ingredient | null =>
        state.list.find((ingredient: Ingredient) => ingredient._id === id) ?? null,
  },
});

export const { setIngredients } = ingredientSlice.actions;
export const { selectIngredients, selectIngredientsById } = ingredientSlice.selectors;

export default ingredientSlice.reducer;
