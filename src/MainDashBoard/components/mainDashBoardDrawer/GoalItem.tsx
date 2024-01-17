import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getCategoryColor } from '@utils/getCategoryColor';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { IcComplete, IcDropDown, IcDropUp, IcEllipse, IcTrash } from '../../assets/icons';
import useContextMenu from '../../hooks/useContextMenu';
import { IobjListTypes } from '../../type/goalItemTypes';
import { ItemTypes } from '../../type/ItemTypes';
import MainDashProgressBar from './MainDashProgressBar';

const GoalItem: React.FC<IobjListTypes> = ({
  id,
  title,
  content,
  category,
  date,
  progress,
  currentGoalId,
  onClickGoal,
  index = 0,
  moveGoal,
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const [initialDragIndex, setInitialDragIndex] = useState<number | null>(null);

  const [rightClickedGoalId, setRightClickedGoalId] = useState<number>();

  const { rightClicked, setRightClicked, rightClickpoints, setRightClickPoints } = useContextMenu();

  const handleRightClickItem = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    e.preventDefault();
    setRightClicked(true);
    setRightClickedGoalId(id);
    setRightClickPoints({ x: e.pageX, y: e.pageY });
  };

  const handleClickComplete = () => {
    console.log(rightClickedGoalId);
    // 완료 서버 통신?
  };

  const handleClickDelete = () => {
    console.log(rightClickedGoalId);
    // 삭제 서버 통신?
  };

  const handleOnClickIcon = (event: React.MouseEvent) => {
    setIsDetailOpen(!isDetailOpen);
    event.stopPropagation();
  };

  const handleOnClick = () => {
    onClickGoal?.(id);
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.GOAL,
    item: { id, index },
    collect: (monitor) => {
      if (monitor.isDragging() && initialDragIndex === null) {
        setInitialDragIndex(index); // 드래그 시작 시 인덱스 저장
      }
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.GOAL,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveGoal?.(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop(item: { index: number }) {
      //목표리스트 dnd 서버통신
      console.log(`Initial item idex : ${initialDragIndex} Dropped item index: ${item.index}`);
    },
  });

  drag(drop(ref));

  return (
    <StGoalItemli
      bgColor={currentGoalId === id}
      onClick={handleOnClick}
      ref={ref}
      isDragging={isDragging}
      onContextMenu={(e) => handleRightClickItem(e, id)}
    >
      {/* 우클릭시 나타나는 팝업 */}
      {rightClicked && (
        <StRightClickPopUpBox $rightClickPoints={rightClickpoints}>
          <StRightClickPopIpLi onClick={handleClickComplete}>
            <IcComplete />
            <p>달성 완료</p>
          </StRightClickPopIpLi>
          <StRightClickPopIpLi onClick={handleClickDelete}>
            <IcTrash />
            <p>목표 삭제</p>
          </StRightClickPopIpLi>
        </StRightClickPopUpBox>
      )}
      <GoalItemContainer>
        <header css={goalItemHeader}>
          <span css={goalItemCategoryBox}>
            <StyledIcEllipse color={getCategoryColor(category)} />
            <StGoalItemCategory>{category}</StGoalItemCategory>
          </span>
          <StGoalItemDate>{date}</StGoalItemDate>
        </header>
        <article css={goalItemArticle}>
          <StGoalItemTitle>{title}</StGoalItemTitle>
          <i>
            {isDetailOpen ? (
              <IcDropUp onClick={handleOnClickIcon} />
            ) : (
              <IcDropDown onClick={handleOnClickIcon} />
            )}
          </i>
        </article>
        {isDetailOpen && <StGoalItemContent>{content}</StGoalItemContent>}
      </GoalItemContainer>
      <footer css={ProgressBarContainer}>
        <MainDashProgressBar
          currentProgress={progress}
          progressBarColor={'#5B5B5B'}
          progressValueColor={currentGoalId === id ? '#FFFFFF' : '#C2C2C2'}
          textColor={'#A7A7A7'}
          isCurrentProgress={false}
        />
      </footer>
    </StGoalItemli>
  );
};

export default GoalItem;

const StGoalItemli = styled.li<{ bgColor: boolean; isDragging: boolean }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors.gray_500 : theme.colors.gray_550};
  border-radius: 6px;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_500};
  }
`;

const GoalItemContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.9rem 1.2rem 1.6rem;
`;

const goalItemHeader = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const goalItemCategoryBox = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const StGoalItemCategory = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.caption_10_medium};
`;

const StGoalItemDate = styled.span`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts.caption_9_regular};
`;

const goalItemArticle = css`
  display: flex;
  gap: 2.4rem;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`;

const StGoalItemTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};

  word-break: keep-all;
`;

const StGoalItemContent = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_10_regular};
`;

const StyledIcEllipse = styled(IcEllipse)<{ color?: string }>`
  & > circle {
    fill: ${({ color }) => color};
  }
`;

const ProgressBarContainer = css`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const StRightClickPopUpBox = styled.ul<{ $rightClickPoints: { x: number; y: number } }>`
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
