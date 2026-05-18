import type { Ingredient } from '@/types/Ingredient';

export type BurgerIngredientProps = Ingredient & {
  count: number;
};
