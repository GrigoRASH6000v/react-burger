import type { Ingredient } from '@/types/Ingredient.ts';

export type ApiResponseData = {
  success: boolean;
  data: Ingredient[];
};

export type IngredientsResponse = {
  data: ApiResponseData;
  status: number;
  statusText: string;
};
