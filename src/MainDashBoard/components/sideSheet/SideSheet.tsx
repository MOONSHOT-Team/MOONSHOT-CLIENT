import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideSheet = ({ isOpen, onClose }: SideSheetProps) => {
  return (
    <StParent>
      <StContainer $isOpen={isOpen}>
        sidesheet
        <button onClick={onClose}>close X</button>
      </StContainer>
    </StParent>
  );
};

export default SideSheet;

const StParent = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
`;

const StContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 34.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : 'none')} 0.3s forwards;
`;
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
