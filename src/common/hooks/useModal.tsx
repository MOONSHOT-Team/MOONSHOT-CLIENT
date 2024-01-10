import { useRef } from 'react';

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleShowModal = () => {
    modalRef.current?.showModal();
  };

  // esc키 눌렀을 때 모달창 닫히는 거 막기
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      e.preventDefault();
    }
  });

  return { modalRef, handleShowModal };
};

export default useModal;
