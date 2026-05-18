import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
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
});

export const { setSelectedIngredient } = selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;

export const selectSelectedIngredient = (state: RootState): IngredientForModal | null =>
  state.selectedIngredient.selectedIngredient;
