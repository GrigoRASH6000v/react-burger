import { DragItem } from '@/components/drag-item/drag-item';
import { useModal } from '@/hooks/useModal';
import { useCreateOrderMutation } from '@/store/api/ordersApi';
import {
  addIngredient,
  setBun,
  removeIngredient,
  sortIngredient,
  clearConstructor,
  selectIngredients,
  selectBun,
  getPrice,
} from '@/store/modules/burger-constructor/burger-constructor-slice';
import { selectUser } from '@/store/modules/user/user-slice';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { ConstructorElementPlaceholder } from '@components/constructor-element-placeholder/constructor-element-placeholder';
import { DropZone } from '@components/drop-zone/drop-zone';
import { ErrorMessage } from '@components/error-message/error-message';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/modals/order-details/order-details';

import type { IngredientForConstructor, ShortIngredient } from '@/types/Ingredient';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalIsOpen, closeModal, openModal } = useModal();
  const ingredients: IngredientForConstructor[] = useSelector(selectIngredients);
  const user = useSelector(selectUser);
  const bun: IngredientForConstructor | null = useSelector(selectBun);
  const [dragItemType, setDragItemType] = useState<string | null>(null);
  const [addOrder, { isLoading, data }] = useCreateOrderMutation();
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const orderButtonIsDisabled: boolean = useMemo(() => {
    return !(bun && ingredients.length);
  }, [bun, ingredients.length]);

  const price = useSelector(getPrice);

  const handleCreateOrder = (): void => {
    if (!user) {
      void navigate('/login', { state: { from: location } });
      return;
    }
    const payload = ingredients.map(({ id }) => id);
    if (bun) {
      payload.unshift(bun.id);
      payload.push(bun.id);
    }

    addOrder({ ingredients: payload })
      .unwrap()
      .then(({ success }): void => {
        if (success) {
          openModal();
          dispatch(clearConstructor());
        }
      })
      .catch(() => setIsError(true));
  };

  const canDrop = (payload: { zoneType: string; item: ShortIngredient }): boolean => {
    return payload.zoneType === 'bun'
      ? payload.item.type === 'bun'
      : payload.item.type !== 'bun';
  };

  const handleOnEnter = (item: ShortIngredient): void => {
    setDragItemType(item.type);
  };

  const handleOnLeave = (): void => {
    setDragItemType(null);
  };

  const handleOnDrop = (item: ShortIngredient): void => {
    item.type === 'bun'
      ? dispatch(setBun({ cId: nanoid(), ...item }))
      : dispatch(addIngredient({ cId: nanoid(), ...item }));
  };

  const handleSortIngredient = (fromIndex: number, toIndex: number): void => {
    dispatch(sortIngredient({ fromIndex, toIndex }));
  };

  if (isError) return <ErrorMessage />;

  return (
    <section className={styles.burger_constructor}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <DropZone
            type="bun"
            accept="INGREDIENT"
            canDrop={canDrop}
            onDrop={handleOnDrop}
            onEnter={handleOnEnter}
            onLeave={handleOnLeave}
          >
            <div className={`${styles.list_item} mb-4 pl-8`}>
              {bun ? (
                <ConstructorElement
                  isLocked={true}
                  price={bun.price}
                  text={`${bun.name} (верх)`}
                  thumbnail={bun.image}
                  type="top"
                />
              ) : (
                <ConstructorElementPlaceholder
                  isHighlight={dragItemType === 'bun'}
                  type="top"
                  text="Выберите булки"
                />
              )}
            </div>
          </DropZone>
          <DropZone
            type="filling"
            accept="INGREDIENT"
            canDrop={canDrop}
            onDrop={handleOnDrop}
            onEnter={handleOnEnter}
            onLeave={handleOnLeave}
            className={styles.drop_zone_overflow}
          >
            {ingredients.length ? (
              <ul className={`${styles.list} custom-scroll`}>
                {ingredients.map(
                  (ingredient: IngredientForConstructor, index: number) => (
                    <li key={`ingredient_${ingredient.cId}`}>
                      <DragItem
                        dragType="INGREDIENT_SORT"
                        index={index}
                        onSort={handleSortIngredient}
                        className={styles.list_item}
                      >
                        <DragIcon className="mr-2" type="primary" />
                        <ConstructorElement
                          handleClose={() => dispatch(removeIngredient(ingredient.cId))}
                          price={ingredient.price}
                          text={ingredient.name}
                          thumbnail={ingredient.image}
                        />
                      </DragItem>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div className={`${styles.list_item} pl-8`}>
                <ConstructorElementPlaceholder
                  isHighlight={!!(dragItemType && dragItemType !== 'bun')}
                  text="Выберите начинку"
                />
              </div>
            )}
          </DropZone>
          <DropZone
            type="bun"
            accept="INGREDIENT"
            canDrop={canDrop}
            onDrop={handleOnDrop}
            onEnter={handleOnEnter}
            onLeave={handleOnLeave}
          >
            <div className={`${styles.list_item} mt-4 pl-8`}>
              {bun ? (
                <ConstructorElement
                  isLocked={true}
                  price={bun.price}
                  text={`${bun.name} (низ)`}
                  thumbnail={bun.image}
                  type="bottom"
                />
              ) : (
                <ConstructorElementPlaceholder
                  isHighlight={dragItemType === 'bun'}
                  type="bottom"
                  text="Выберите булки"
                />
              )}
            </div>
          </DropZone>

          <div className={styles.footer}>
            <div className={styles.price}>
              <span className="text text_type_digits-medium">{price}</span>
              <CurrencyIcon className={styles.footer_icon} type="primary" />
            </div>
            <Button
              disabled={orderButtonIsDisabled}
              onClick={handleCreateOrder}
              size="large"
              type="primary"
            >
              <span className="text text_type_main-default">Оформить заказ</span>
            </Button>
          </div>
        </>
      )}

      {modalIsOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails identification={data?.order.number ?? ''} status="success" />
        </Modal>
      )}
    </section>
  );
};
