import type { IngredientForModal } from '@/types/Ingredient';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({
  img,
  name,
  params,
}: IngredientForModal): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <img src={img} className={styles.image} alt={`Изображение ингридиента: ${name}`} />
      <span className="mb-8 text text_type_main-medium">{name}</span>
      <div className={styles.table}>
        <div className={styles.col}>
          <span className="mb-2 text text_type_main-default text_color_inactive">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {params.calories}
          </span>
        </div>
        <div className={styles.col}>
          <span className="mb-2 text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {params.proteins}
          </span>
        </div>
        <div className={styles.col}>
          <span className="mb-2 text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {params.fat}
          </span>
        </div>
        <div className={styles.col}>
          <span className="mb-2 text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {params.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};
