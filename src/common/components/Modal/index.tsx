import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

/**
 * modal component :
 * 1. children으로 code 넘기기.
 * 2. close button은
 * `<form method="dialog">`
 * 태그로 감싸주면
 * 별다른 로직 없이 close 기능 구현 가능합니다.
 */
const Modal = forwardRef<HTMLDialogElement, PropsWithChildren>(({ children }, ref) => {
  return createPortal(
    <ModalDialog ref={ref}>{children}</ModalDialog>,
    document.getElementById('modal')!,
  );
});

Modal.displayName = 'Modal';

export default Modal;

const slideInFromTop = keyframes`
0% {
  transform: translate(-50%, -65%);
  opacity: 0;
}
100% {
  transform: translate(-50%, -50%);
  opacity: 1;
}
`;

const ModalDialog = styled.dialog`
  position: fixed;
  top: 50vh;
  left: 50%;
  width: 47.6rem;
  height: 47.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background: ${({ theme }) => theme.colors.gray_550};
  border: none;
  border-radius: 10px;
  transform: translate(-50%, -50%);

  &[open] {
    animation: ${slideInFromTop} 0.35s ease-out;
  }

  &::backdrop {
    background: ${({ theme }) => theme.colors.background};
  }
`;