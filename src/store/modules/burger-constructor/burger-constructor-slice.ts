import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import type { IngredientForConstructor } from '@/types/Ingredient';

type InitialState = {
  bun: IngredientForConstructor | null;
  ingredients: IngredientForConstructor[];
};

const initialState: InitialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<IngredientForConstructor>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientForConstructor>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.cId !== action.payload
      );
    },
    sortIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredient = state.ingredients.splice(fromIndex, 1)[0];
      state.ingredients.splice(toIndex, 0, ingredient);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
  selectors: {
    selectBun: (state: InitialState) => state.bun,
    selectIngredients: (state: InitialState) => state.ingredients,
    getCountIngredientsByTypeAndId: createSelector(
      [
        (state: InitialState): IngredientForConstructor | null => state.bun,
        (state: InitialState): IngredientForConstructor[] => state.ingredients,
      ],
      (bun, ingredients) =>
        (params: { type: string; id: string }): number => {
          if (params.type === 'bun' && bun?.id === params.id) return 2;
          return ingredients.reduce((acc, ingredient) => {
            if (ingredient.id === params.id) acc += 1;
            return acc;
          }, 0);
        }
    ),
    getPrice: createSelector(
      [
        (state: InitialState): IngredientForConstructor | null => state.bun,
        (state: InitialState): IngredientForConstructor[] => state.ingredients,
      ],
      (
        bun: IngredientForConstructor | null,
        ingredients: IngredientForConstructor[]
      ) => {
        let price = ingredients.reduce((acc, ingredient): number => {
          acc += ingredient.price;
          return acc;
        }, 0);

        if (bun) price += bun.price * 2;
        return price;
      }
    ),
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  sortIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;

export const { selectBun, selectIngredients, getCountIngredientsByTypeAndId, getPrice } =
  burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
