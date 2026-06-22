import { useAppSelector } from '@/hooks/redux';
import { selectIngredientsById } from '@/store/modules/ingredients/ingredient-slice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@components/modal/modal.tsx';
import { IngredientDetails as IngredientDetailsComponent } from '@components/modals/ingredient-details/ingredient-details.tsx';

import type { RootState } from '@/store';

export const IngredientDetails = (): React.JSX.Element | null => {
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/';
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const ingredientDetails = useAppSelector((state: RootState) => {
    if (!id) return null;
    return selectIngredientsById(state)(id);
  });
  const handleClose = (): void => {
    void navigate(from);
  };

  if (!ingredientDetails) return null;

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetailsComponent {...ingredientDetails} />
    </Modal>
  );
};
