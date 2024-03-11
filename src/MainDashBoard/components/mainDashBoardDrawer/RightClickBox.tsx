import styled from '@emotion/styled';
import { useEffect } from 'react';

import { IcComplete, IcTrash } from '../../assets/icons';

interface IRightClickBoxProps {
  rightClickPoints: { x: number | null; y: number | null };
  handleClickComplete?: () => void;
  handleClickDelete?: (e: React.MouseEvent) => void;
  setIsRightClick: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDelObjBtn: () => void;
  handleClickCompleteObjBtn: () => void;
}

const RightClickBox = ({
  rightClickPoints,
  handleClickDelObjBtn,
  setIsRightClick,
  handleClickCompleteObjBtn,
}: IRightClickBoxProps) => {
  useEffect(() => {
    setIsRightClick(true);

    return () => {
      setIsRightClick(false);
    };
  }, []);

  return (
    <>
      {rightClickPoints && (
        <StRightClickPopUpBox $rightClickPoints={rightClickPoints}>
          <StRightClickPopIpLi onClick={handleClickCompleteObjBtn}>
            <IcComplete />
            <p>달성 완료</p>
          </StRightClickPopIpLi>
          <StRightClickPopIpLi onClick={handleClickDelObjBtn}>
            <IcTrash />
            <p>목표 삭제</p>
          </StRightClickPopIpLi>
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
  background-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_12_medium};
`;

const StRightClickPopIpLi = styled.li`
  display: flex;
  gap: 1.2rem;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 2px;

  ${({ theme }) => theme.fonts.body_12_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.transparent_white};
  }
`;
