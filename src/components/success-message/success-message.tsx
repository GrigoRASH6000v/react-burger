import { Button } from '@krgaa/react-developer-burger-ui-components';

import type { SuccessMessageProps } from './types';

import styles from './success-message.module.css';

export const SuccessMessage = ({
  onClose,
  text = 'Успешный успех!',
  textButton = 'Закрыть',
}: SuccessMessageProps): React.JSX.Element => {
  return (
    <div className={styles.success_message}>
      <span className="text text_type_main-medium mb-5">{text}</span>
      <Button onClick={onClose} size="small" type="primary">
        <span className="text text_type_main-small">{textButton}</span>
      </Button>
    </div>
  );
};
