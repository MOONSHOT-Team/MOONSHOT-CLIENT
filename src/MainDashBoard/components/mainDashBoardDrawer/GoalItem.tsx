import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { IcDropDown, IcDropUp, IcEllipse } from '../../assets/icons';
import { GOAL_CATEGORY } from '../../constants/GOAL_CATEGORY';
import { IobjListTypes } from '../../type/goalItemTypes';
import { ItemTypes } from '../../type/ItemTypes';
import MainDashProgressBar from './MainDashProgressBar';

const GoalItem = ({
  id,
  title,
  content,
  category,
  date,
  progress,
  currentGoalId,
  onClickGoal,
  index,
  moveItem,
}: IobjListTypes) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const handleOnClickIcon = (event: React.MouseEvent) => {
    setIsDetailOpen(!isDetailOpen);
    event.stopPropagation();
  };

  const handleOnClick = () => {
    onClickGoal?.(id);
  };

  const color = GOAL_CATEGORY.find((item) => item.category === category)?.color;

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <StGoalItemli
      bgColor={currentGoalId === id}
      onClick={handleOnClick}
      ref={ref}
      isDragging={isDragging}
    >
      <GoalItemContainer>
        <header css={goalItemHeader}>
          <span css={goalItemCategoryBox}>
            <StyledIcEllipse color={color} />
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
