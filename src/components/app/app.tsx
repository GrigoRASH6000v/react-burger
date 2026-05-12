import api from '@/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ErrorMessage } from '@components/error-message/error-message';

import type { IngredientsResponse } from '@/api/modules/ingridients/types';
import type { Ingredient } from '@/types/Ingredient';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [isLoad, setIsLoad] = useState(false);
  const [fetchIsFailed, setFetchIsFailed] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [activeTab, setActiveTab] = useState('bun');

  const fetchIngredients = async (): Promise<void> => {
    try {
      setIsLoad(true); // Начинаем загрузку
      const response: IngredientsResponse = await api.ingredients.getAll();
      const {
        data: { data: list, success },
      } = response;
      if (success) {
        setIngredients(list);
      }
    } catch (e) {
      setFetchIsFailed(true);
      console.error(e);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    void fetchIngredients();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoad ? (
          <Preloader />
        ) : fetchIsFailed ? (
          <ErrorMessage />
        ) : (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
