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
    <StModalDialog ref={ref}>{children}</StModalDialog>,
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

const StModalDialog = styled.dialog`
  position: fixed;
  top: 50vh;
  left: 50%;
  width: fit-content;
  height: fit-content;
  overflow: visible; /* dialog 위로 datepicker 달력 나올수 있도록 수정 */
  background: ${({ theme }) => theme.colors.gray_550};
  border: none;
  border-radius: 10px;
  transform: translate(-50%, -50%);

  &[open] {
    animation: ${slideInFromTop} 0.35s ease-out;
  }

  &::backdrop {
    background: ${({ theme }) => theme.colors.transparent_black_50};
  }
`;
