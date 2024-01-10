import { useRef } from 'react';

/**
 * 사용법 :
 * 원하는 component 내에서
 * const { modalRef, handleShowModal } = useModal();
 * 받아온 후,
 * `<Modal ref={modalRef}>`
 * Modal에 ref로 넣어주세요.
 */
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
