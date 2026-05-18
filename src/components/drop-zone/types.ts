import type { ShortIngredient } from '@/types/Ingredient.ts';

export type DropZoneProps = {
  accept: string;
  children: React.ReactNode;
  type: string;
  canDrop: (payload: { zoneType: string; item: ShortIngredient }) => boolean;
  onDrop: (item: ShortIngredient) => void;
  onEnter: (item: ShortIngredient) => void;
  onLeave: (item: ShortIngredient) => void;
  className?: string;
};
