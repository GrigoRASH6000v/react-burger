import type { ConstructorElementPlaceholderProps } from './types';

import styles from './constructor-element-placeholder.module.css';

export const ConstructorElementPlaceholder = ({
  type = 'base',
  text,
  isHighlight = false,
}: ConstructorElementPlaceholderProps): React.JSX.Element => {
  const typeModificator =
    type === 'top' ? styles.top : type === 'bottom' ? styles.bottom : styles.base;

  return (
    <div
      className={`${styles.placeholder} ${typeModificator} ${isHighlight && styles.highlight} text text_type_main-default`}
    >
      {text}
    </div>
  );
};
