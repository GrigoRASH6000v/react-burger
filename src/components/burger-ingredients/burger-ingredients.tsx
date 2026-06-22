import { useAppSelector } from '@/hooks/redux';
import tabsData from '@/static/data/tabs.json';
import {
  getCountIngredientsByTypeAndId,
  selectIngredients as selectConstructorIngredients,
  selectBun,
} from '@/store/modules/burger-constructor/burger-constructor-slice';
import { selectIngredients } from '@/store/modules/ingredients/ingredient-slice';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerIngredient } from '@components/burger-ingredient/burger-ingredient';

import type { Ingredient } from '@/types/Ingredient';
import type { Tab as TabType } from '@/types/tab';

import styles from './burger-ingredients.module.css';

type BreakPoint = {
  id: string;
  position: number;
};

export const BurgerIngredients = (): React.JSX.Element => {
  const navigate = useNavigate();
  const ingredients = useAppSelector(selectIngredients);
  const constructorIngredients = useAppSelector(selectConstructorIngredients);
  const constructorBuns = useAppSelector(selectBun);
  const getCount = useAppSelector(getCountIngredientsByTypeAndId);
  const ingredientsWithCount = useMemo(() => {
    return ingredients.map((ingredient: Ingredient) => ({
      ...ingredient,
      count: getCount({ type: ingredient.type, id: ingredient._id }),
    }));
  }, [ingredients, constructorBuns, constructorIngredients]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyScrollTop, setBodyScrollTop] = useState(0);
  const [groupBreakPoints, setGroupBreakPoints] = useState<BreakPoint[]>([]);

  const currentTab: string = useMemo(() => {
    let result = groupBreakPoints.length ? groupBreakPoints[0].id : '';
    groupBreakPoints.forEach((point, index) => {
      const nextPoint = groupBreakPoints[index + 1];
      if (bodyScrollTop >= point.position) {
        if (nextPoint) {
          const pixelQuantityToNextEl = nextPoint.position - point.position;
          const pexInPercent = pixelQuantityToNextEl / 100;
          const pathBetweenPoints = (bodyScrollTop - point.position) / pexInPercent;

          result = pathBetweenPoints <= 50 ? point.id : nextPoint.id;
        } else {
          result = point.id;
        }
      }
    });
    return result;
  }, [bodyScrollTop, groupBreakPoints]);

  const groupedIngredientsByType = useMemo(() => {
    return ingredientsWithCount.reduce(
      (acc, ingredient) => {
        if (!acc[ingredient.type]) {
          acc[ingredient.type] = [];
        }
        acc[ingredient.type].push(ingredient);
        return acc;
      },
      {} as Record<string, Ingredient[]>
    );
  }, [ingredientsWithCount]);

  const handleSelectIngredient = (ingredient: Ingredient): void => {
    void navigate(`/ingredient/${ingredient._id}`);
  };

  const getGroupTitle = (value: string): string =>
    tabsData.find((tab) => tab.value === value)?.label ?? '';

  const handleScroll = (): void => {
    if (bodyRef.current) {
      setBodyScrollTop(bodyRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      const bodyRect = bodyRef.current.getBoundingClientRect().top;
      const children = Array.from(bodyRef.current.children) as HTMLDivElement[];

      const points = children
        .filter((el): el is HTMLDivElement => el.id !== '')
        .map((el) => ({
          id: el.id,
          position: el.getBoundingClientRect().top - bodyRect,
        }));

      setGroupBreakPoints(points);
    }
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-5">
        <ul className={styles.menu}>
          {tabsData.map((tab: TabType) => (
            <Tab
              key={`ingredient-tab_${tab.value}`}
              value={tab.value}
              active={currentTab === tab.value}
              onClick={() => {
                const element = document.getElementById(tab.value);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {tab.label}
            </Tab>
          ))}
        </ul>
      </nav>
      <div
        ref={bodyRef}
        className={`${styles.body} custom-scroll`}
        onScroll={handleScroll}
      >
        {Object.keys(groupedIngredientsByType).map((key) => (
          <div key={`group-${key}`} id={key}>
            <h2>{getGroupTitle(key)}</h2>
            <ul className={styles.body_list}>
              {groupedIngredientsByType[key].map((ingredient) => (
                <li
                  key={`ingredient-item_${ingredient._id}`}
                  className={styles.ingredient}
                  onClick={() => handleSelectIngredient(ingredient)}
                >
                  <BurgerIngredient {...ingredient} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
