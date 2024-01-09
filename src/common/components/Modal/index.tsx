import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }: PropsWithChildren) => {
  return createPortal(
    <ModalDialog open>{children}</ModalDialog>,
    document.getElementById('modal')!,
  );
};

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
  padding: 2rem;
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
