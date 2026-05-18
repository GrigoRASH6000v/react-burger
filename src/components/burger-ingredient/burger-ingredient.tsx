import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import type { BurgerIngredientProps } from './types';

import styles from './burger-ingredient.module.css';

export const BurgerIngredient = ({
  _id,
  name,
  image,
  price,
  type,
  count,
}: BurgerIngredientProps): React.JSX.Element => {
  const [, dragRef] = useDrag(() => ({
    type: 'INGREDIENT',
    item: { id: _id, type, image, price, name },
  }));

  return (
    <div ref={dragRef} className={styles.ingredient}>
      {!!count && <Counter extraClass={styles.ingredient_counter} count={count} />}
      <div className={`${styles.ingredient_img} mb-3`}>
        <img src={image} alt={`Изображение ингредиента: ${name}`} />
      </div>
      <div className={`${styles.ingredient_price} mb-3`}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon className="ml-2" type="primary" />
      </div>
      <span className={styles.ingredient_name}>{name}</span>
    </div>
  );
};
