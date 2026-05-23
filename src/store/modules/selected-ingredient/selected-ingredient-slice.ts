import { createSlice } from '@reduxjs/toolkit';

import type { IngredientForModal } from '@/types/Ingredient';

type InitialState = {
  selectedIngredient: IngredientForModal | null;
};

const initialState: InitialState = {
  selectedIngredient: null,
};

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: { payload: IngredientForModal | null }) => {
      state.selectedIngredient = action.payload;
    },
  },
  selectors: {
    selectSelectedIngredient: (state: InitialState): IngredientForModal | null =>
      state.selectedIngredient,
  },
});

export const { setSelectedIngredient } = selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;
export const { selectSelectedIngredient } = selectedIngredientSlice.selectors;
