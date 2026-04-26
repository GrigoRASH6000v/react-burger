import { useModal } from '@/hook/useModal.ts';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/modals/order-details/order-details.tsx';

import type { BurgerConstructorProps } from './types';
import type { Ingredient } from '@/types/Ingredient';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({
  ingredients,
}: BurgerConstructorProps): React.JSX.Element => {
  const { modalIsOpen, closeModal, openModal } = useModal();

  const price = useMemo(() => {
    return ingredients.reduce((acc, el) => {
      acc += el.price;
      return acc;
    }, 0);
  }, [ingredients]);
  const topBun = ingredients.find((item) => item.type === 'bun');
  const fillings = ingredients.filter((item) => item.type !== 'bun');
  const bottomBun = topBun ? { ...topBun } : null;

  return (
    <section className={styles.burger_constructor}>
      {topBun && (
        <div className={`${styles.list_item} mb-4 pl-8`}>
          <ConstructorElement
            handleClose={() => console.log('test')}
            isLocked={true}
            price={topBun.price}
            text={`${topBun.name} (верх)`}
            thumbnail={topBun.image}
            type="top"
          />
        </div>
      )}
      {fillings.length && (
        <ul className={`${styles.list} custom-scroll`}>
          {fillings.map((ingredient: Ingredient) => (
            <li key={`ingredient_${ingredient.name}`} className={styles.list_item}>
              <DragIcon className="mr-2" type="primary" />
              <ConstructorElement
                handleClose={() => console.log('test')}
                price={200}
                text={ingredient.name}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
      )}
      {bottomBun && (
        <div className={`${styles.list_item} mt-4 pl-8`}>
          <ConstructorElement
            handleClose={() => console.log('test')}
            isLocked={true}
            price={bottomBun.price}
            text={`${bottomBun.name} (низ)`}
            thumbnail={bottomBun.image}
            type="bottom"
          />
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.price}>
          <span className="text text_type_digits-medium">{price}</span>
          <CurrencyIcon className={styles.footer_icon} type="primary" />
        </div>

        <Button onClick={openModal} size="large" type="primary">
          <span className="text text_type_main-default">Оформить заказ</span>
        </Button>
      </div>
      {modalIsOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails identification="034536" status="success" />
        </Modal>
      )}
    </section>
  );
};
