import { useState, useCallback } from 'react';

type ModalReturnType = [
  isOpenModal: boolean,
  handleModalOpenButtonClick: () => void,
  handleModalCloseButtonClick: () => void,
];

const useModal = (initialState: boolean): ModalReturnType => {
  const [isOpenModal, setIsOpenModal] = useState(initialState);

  const handleModalOpenButtonClick = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  const handleModalCloseButtonClick = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  return [isOpenModal, handleModalOpenButtonClick, handleModalCloseButtonClick];
};

export default useModal;
