import { Button } from '@krgaa/react-developer-burger-ui-components';

import styles from './error-message.module.css';

export const ErrorMessage = (): React.JSX.Element => {
  return (
    <div className={styles.error_message}>
      <span className="text text_type_main-medium mb-5">Ошибка при загрузке((</span>
      <Button onClick={() => window.location.reload()} size="small" type="primary">
        <span className="text text_type_main-small">Перезагрузите страницу</span>
      </Button>
    </div>
  );
};
