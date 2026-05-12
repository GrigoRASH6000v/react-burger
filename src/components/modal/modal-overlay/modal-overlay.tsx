import type { ModalOverlayProps } from './types';

import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick }: ModalOverlayProps): React.JSX.Element => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};
