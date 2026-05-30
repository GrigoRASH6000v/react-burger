import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.home}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <div className={styles.body}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
        <Outlet />
      </div>
    </DndProvider>
  );
};

export default Home;
