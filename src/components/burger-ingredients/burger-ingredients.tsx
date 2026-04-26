import tabsData from '@/static/data/tabs.json';
import { Tab, CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';

import { Modal } from '@components/modal/modal.tsx';
import { IngredientDetails } from '@components/modals/ingredient-details/ingredient-details';

import type { BurgerIngredientsProps } from './types';
import type { Ingredient, ShortIngredient } from '@/types/Ingredient';
import type { Tab as TabType } from '@/types/tab';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients,
  activeTab,
  onChange,
}: BurgerIngredientsProps): React.JSX.Element => {
  const [openedIngredient, setOpenedIngredient] = useState<ShortIngredient | null>(null);
  const activeTabTitle = tabsData.find((tab) => tab.value === activeTab)?.label ?? '';
  const filteredIngredients = useMemo(() => {
    return ingredients.filter((ingredient: Ingredient) => ingredient.type === activeTab);
  }, [ingredients, activeTab]);
  const handleSelectIngredient = (ingredient: Ingredient): void => {
    setOpenedIngredient({
      img: ingredient.image,
      name: ingredient.name,
      params: {
        calories: ingredient.calories,
        fat: ingredient.fat,
        proteins: ingredient.proteins,
        carbohydrates: ingredient.carbohydrates,
      },
    });
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-5">
        <ul className={styles.menu}>
          {tabsData.map((tab: TabType) => (
            <Tab
              key={`ingredient-tab_${tab.value}`}
              value={tab.value}
              active={activeTab === tab.value}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={`${styles.body} custom-scroll`}>
        <h2>{activeTabTitle}</h2>
        <ul className={styles.body_list}>
          {filteredIngredients.map((ingredient) => (
            <li
              key={`ingredient-item_${ingredient._id}`}
              className={styles.ingredient}
              onClick={() => handleSelectIngredient(ingredient)}
            >
              <Counter extraClass={styles.ingredient_counter} count={1} />
              <div className={`${styles.ingredient_img} mb-3`}>
                <img src={ingredient.image} alt="Изображение ингридиента" />
              </div>
              <div className={`${styles.ingredient_price} mb-3`}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon className="ml-2" type="primary" />
              </div>
              <span className={styles.ingredient_name}>{ingredient.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={Boolean(openedIngredient)}
        title="Детали ингридиента"
        onClose={() => setOpenedIngredient(null)}
      >
        {openedIngredient && <IngredientDetails {...openedIngredient} />}
      </Modal>
    </section>
  );
};
