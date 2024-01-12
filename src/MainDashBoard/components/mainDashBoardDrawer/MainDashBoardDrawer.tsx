import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { IcDropDown, IcDropUp, IcEllipse } from '../../assets/icons';
import { GOAL_CATEGORY } from '../../constants/GOAL_CATEGORY';
import { GOAL_DATA } from '../../constants/GOAL_DATA';
import { IobjListTypes } from '../../type/goalItemTypes';
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
}: IobjListTypes) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOnClick = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  const color = GOAL_CATEGORY.find((item) => item.category === category)?.color;

  return (
    <GoalItemli bgColor={currentGoalId === id} onClick={() => onClickGoal?.(id)}>
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
              <IcDropUp onClick={handleOnClick} />
            ) : (
              <IcDropDown onClick={handleOnClick} />
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
    </GoalItemli>
  );
};

const GoalItemli = styled.li<{ bgColor: boolean }>`
  position: relative;
  width: 18.8rem;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors.gray_500 : theme.colors.gray_550};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_500};
  }
`;

const GoalItemContainer = styled.section`
  display: flex;
  flex-direction: column;
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

const MainDashBoardDrawer = () => {
  const [currentGoalId, setCurrentGoalId] = useState(7);

  const { objList } = GOAL_DATA;

  const handleClickGoal = (id: number) => {
    setCurrentGoalId(id);
  };

  return (
    <StContainer>
      <div>
        <button type="button">목표 추가하기</button>
      </div>
      <div>
        <div>
          <span>목표 리스트</span>
          <span>0/0</span>
        </div>
        <ul style={{ padding: '2.2rem' }}>
          {objList.map((objListItem) => {
            return (
              <GoalItem
                key={objListItem.id}
                {...objListItem}
                currentGoalId={currentGoalId}
                onClickGoal={handleClickGoal}
              />
            );
          })}
        </ul>
      </div>
    </StContainer>
  );
};

export default MainDashBoardDrawer;

const StContainer = styled.aside`
  min-width: 23.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;
