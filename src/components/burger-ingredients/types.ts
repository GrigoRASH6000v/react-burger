import type { Ingredient } from '@/types/Ingredient';
import type { Tab } from '@/types/tab';

export type BurgerIngredientsProps = {
  ingredients: Ingredient[];
  onChange: (value: Tab['value']) => void;
  activeTab: Tab['value'];
};
