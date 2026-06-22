import { authApi } from '@/store/api/authApi/authApi.ts';
import { ordersApi } from '@/store/api/ordersApi';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './api/ingredientsApi';
import burgerConstructorReducer from './modules/burger-constructor/burger-constructor-slice';
import ingredientsReducer from './modules/ingredients/ingredient-slice';
import userReducer from './modules/user/user-slice';

const rootReducer = combineSlices(ingredientsApi, ordersApi, authApi, {
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
});

export const setupStore = (preloadedState?: RootState): AppStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        ingredientsApi.middleware,
        ordersApi.middleware,
        authApi.middleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];
