import { useState, useCallback } from 'react';

type UseModal = {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (): UseModal => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = useCallback((): void => setModalIsOpen(false), []);
  const openModal = useCallback((): void => setModalIsOpen(true), []);

  return {
    modalIsOpen,
    closeModal,
    openModal,
  };
};
