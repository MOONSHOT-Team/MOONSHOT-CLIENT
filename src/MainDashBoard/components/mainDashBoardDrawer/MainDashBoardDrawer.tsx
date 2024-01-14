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

const MainDashBoardDrawer = () => {
  const [currentGoalId, setCurrentGoalId] = useState(7);

  const { objList } = GOAL_DATA;

  const handleClickGoal = (id: number) => {
    setCurrentGoalId(id);
  };

  return (
    <StContainer>
      <div>
        <StAddGoalBtn type="button">목표 추가하기</StAddGoalBtn>
      </div>
      <div css={{ height: 'calc(100% - 10rem)', display: 'flex', flexDirection: 'column' }}>
        <div css={goalListHeader}>
          <St목표리스트>목표 리스트</St목표리스트>
          <St목표리스트개수>{0}/10</St목표리스트개수>
        </div>
        <StScrollContainer>
          <ul css={ulStyles}>
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
        </StScrollContainer>
      </div>
    </StContainer>
  );
};

export default MainDashBoardDrawer;

const StContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 23.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;

const StAddGoalBtn = styled.button`
  width: 18.8rem;
  height: 3.6rem;
  margin: 2.4rem 2.2rem;
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.btn_14_semibold};

  background-color: ${({ theme }) => theme.colors.main_darkpurple};
  border-radius: 6px;
`;

const goalListHeader = css`
  display: flex;
  justify-content: space-between;
  padding: 0 2.2rem 1.4rem;
`;
const St목표리스트 = styled.div`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};
`;

const St목표리스트개수 = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StScrollContainer = styled.div`
  flex: 1;
  padding: 0 1rem 2.2rem 2.2rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray_500};
    background-clip: padding-box; /* 스크롤에 여백넣기 -> background에 테두리영역 제외하여 표현 */
    border: 4px solid transparent;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    background-size: cover;
  }
`;

const ulStyles = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 2rem;
`;

const GoalItemli = styled.li<{ bgColor: boolean }>`
  position: relative;
  width: 100%;
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
