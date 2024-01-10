import { useRef } from 'react';

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleShowModal = () => {
    modalRef.current?.showModal();
  };

  return { modalRef, handleShowModal };
};

export default useModal;
