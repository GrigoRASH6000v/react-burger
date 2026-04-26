import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal/modal-overlay/modal-overlay';

import type { ModalProps } from './types';

import styles from './modal.module.css';

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): React.JSX.Element | null => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent): void => {
    e.key === 'Escape' && onClose();
  };

  useEffect(() => {
    const createModalContainer = (): HTMLDivElement => {
      const container = document.createElement('div');
      container.id = 'modal';
      document.body.appendChild(container);
      return container;
    };

    let modalContainer = document.getElementById('modal') as HTMLDivElement | null;
    modalContainer ??= createModalContainer();

    modalContainerRef.current = modalContainer;

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !modalContainerRef.current) {
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
    modalContainerRef.current
  );
};
