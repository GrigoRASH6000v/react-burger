import doneImg from '@/assets/images/done.svg';

import type { OrderDetailsProps } from './types.ts';

import styles from './order-details.module.css';

export const OrderDetails = ({
  identification,
  status = 'success',
}: OrderDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <h3 className="mb-8 text text_type_digits-large">{identification}</h3>
      <span className="mb-15 text text_type_main-medium">идентификатор заказа</span>
      {status === 'success' && (
        <>
          <img
            className={`${styles.image} mb-15 pt-1`}
            src={`${doneImg}`}
            alt="Иконка статуса"
          />
          <span className="pt-3 mb-2 text text_type_main-default">
            Ваш заказ начали готовить
          </span>
          <span className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      )}
    </div>
  );
};
