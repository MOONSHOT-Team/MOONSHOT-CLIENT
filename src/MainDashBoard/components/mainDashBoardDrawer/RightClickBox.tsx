import styled from '@emotion/styled';
import { useEffect } from 'react';

import { IRightClickStateTypes } from '../..';
import { IcComplete, IcTrash } from '../../assets/icons';

interface IRightClickBoxProps {
  rightClickPoints: { x: number | null; y: number | null };
  handleClickComplete?: () => void;
  handleClickDelete?: (e: React.MouseEvent) => void;
  setRightClickState: React.Dispatch<React.SetStateAction<IRightClickStateTypes>>;
  handleClickDelObjBtn: () => void;
  handleClickCompleteObjBtn: () => void;
}

const RightClickBox = ({
  rightClickPoints,
  handleClickDelObjBtn,
  setRightClickState,
  handleClickCompleteObjBtn,
}: IRightClickBoxProps) => {
  useEffect(() => {
    const handleClick = () => {
      setRightClickState((prev) => {
        return {
          ...prev,
          isRightClick: false,
        };
      });
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {rightClickPoints && (
        <StRightClickPopUpBox $rightClickPoints={rightClickPoints}>
          <StRightClickPopUpLi onClick={handleClickCompleteObjBtn}>
            <IcComplete />
            <p>달성 완료</p>
          </StRightClickPopUpLi>
          <StRightClickPopUpLi onClick={handleClickDelObjBtn}>
            <IcTrash />
            <p>목표 삭제</p>
          </StRightClickPopUpLi>
        </StRightClickPopUpBox>
      )}
    </>
  );
};

export default RightClickBox;

const StRightClickPopUpBox = styled.ul<{
  $rightClickPoints: { x: number | null; y: number | null };
}>`
  position: fixed;
  top: ${({ $rightClickPoints }) => $rightClickPoints.y}px;
  left: ${({ $rightClickPoints }) => $rightClickPoints.x}px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 15.8rem;
  height: 8rem;
  padding: 0.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
  cursor: default;
  background-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_12_medium};
`;

const StRightClickPopUpLi = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 2px;

  ${({ theme }) => theme.fonts.body_12_medium};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.transparent_white};
  }
`;
