import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { createSelector } from 'reselect';

import type { RootState } from '@/store';
import type { IngredientForConstructor, ShortIngredient } from '@/types/Ingredient';

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
    setBun: (state, action: PayloadAction<ShortIngredient>) => {
      const { id, name, price, image, type } = action.payload;
      state.bun = {
        cId: nanoid(),
        id,
        type,
        name,
        price,
        image,
      };
    },
    addIngredient: (state, action: PayloadAction<ShortIngredient>) => {
      const { id, name, price, image, type } = action.payload;
      state.ingredients.push({
        cId: nanoid(),
        id,
        type,
        name,
        price,
        image,
      });
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
  },
});

export const { setBun, addIngredient, removeIngredient, sortIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;

export const selectBun = (state: RootState): IngredientForConstructor | null =>
  state.burgerConstructor.bun;

export const selectIngredients = (state: RootState): IngredientForConstructor[] =>
  state.burgerConstructor.ingredients;

export const getCountIngredientsByTypeAndId = createSelector(
  [selectBun, selectIngredients],
  (bun, ingredients) =>
    (params: { type: string; id: string }): number => {
      if (params.type === 'bun' && bun?.id === params.id) return 2;
      return ingredients.reduce((acc, ingredient) => {
        if (ingredient.id === params.id) acc += 1;
        return acc;
      }, 0);
    }
);

export const getPrice = createSelector(
  [selectBun, selectIngredients],
  (bun: IngredientForConstructor | null, ingridients: IngredientForConstructor[]) => {
    let price = ingridients.reduce((acc, ingridient): number => {
      acc += ingridient.price;
      return acc;
    }, 0);

    if (bun) price += bun.price * 2;
    return price;
  }
);
