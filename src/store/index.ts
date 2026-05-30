import { ordersApi } from '@/store/api/ordersApi';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './api/ingredientsApi';
import burgerConstructorReducer from './modules/burger-constructor/burger-constructor-slice';
import ingredientsReducer from './modules/ingredients/ingredient-slice';
import selectedIngredientReducer from './modules/selected-ingredient/selected-ingredient-slice';

const rootReducer = combineSlices(ingredientsApi, ordersApi, {
  selectedIngredient: selectedIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
});

export const setupStore = (preloadedState?: RootState): AppStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        ingredientsApi.middleware,
        ordersApi.middleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
