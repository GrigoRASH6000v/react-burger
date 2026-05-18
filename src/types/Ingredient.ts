export type Ingredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
};

type Params = {
  calories: number;
  fat: number;
  proteins: number;
  carbohydrates: number;
};

export type IngredientForModal = {
  img: string;
  name: string;
  params: Params;
};

export type ShortIngredient = {
  id: string;
  image: string;
  name: string;
  price: number;
  type: string;
};

export type IngredientForConstructor = ShortIngredient & {
  cId: string;
};
