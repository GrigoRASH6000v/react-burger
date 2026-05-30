import { useGetIngredientsQuery } from '@/store/api/ingredientsApi.ts';
import { setIngredients } from '@/store/modules/ingredients/ingredient-slice.ts';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header.tsx';
import { ErrorMessage } from '@components/error-message/error-message.tsx';

import type { Ingredient } from '@/types/Ingredient.ts';

import styles from './full-layout.module.css';

export const FullLayout = (): React.JSX.Element => {
  const { isLoading, data, isError } = useGetIngredientsQuery();

  const dispatch = useDispatch();

  const ingredients: Ingredient[] = data?.data ?? [];

  useEffect(() => {
    if (ingredients.length > 0) {
      dispatch(setIngredients(ingredients));
    }
  }, [dispatch, ingredients]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading ? <Preloader /> : isError ? <ErrorMessage /> : <Outlet />}
      </main>
    </div>
  );
};
