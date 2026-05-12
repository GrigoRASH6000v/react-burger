import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal/modal-overlay/modal-overlay';

import type { ModalProps } from './types';

import styles from './modal.module.css';

export const Modal = ({
  onClose,
  children,
  title,
}: ModalProps): React.JSX.Element | null => {
  const container = useMemo(() => {
    let containerEl = document.getElementById('modal');

    if (!containerEl) {
      containerEl = document.createElement('div');
      containerEl.id = 'modal';
      document.body.appendChild(containerEl);
    }
    return containerEl;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!container) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <button
            className={styles.close_button}
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    container
  );
};
