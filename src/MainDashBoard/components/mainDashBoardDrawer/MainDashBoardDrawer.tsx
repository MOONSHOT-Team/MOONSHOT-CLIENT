import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { IobjListTypes } from '../../type/goalItemTypes';
import GoalItem from './GoalItem';

interface IDrawerProps {
  objList: IobjListTypes[];
  onChangeCurrentGoalId: (id: number) => void;
}

const MainDashBoardDrawer = ({ objList, onChangeCurrentGoalId }: IDrawerProps) => {
  const [currentGoalId, setCurrentGoalId] = useState(7);

  const handleClickGoal = (id: number) => {
    setCurrentGoalId(id);
    onChangeCurrentGoalId(id);
  };

  return (
    <StContainer>
      <div>
        <StAddGoalBtn type="button">목표 추가하기</StAddGoalBtn>
      </div>
      <div css={{ height: 'calc(100% - 10rem)', display: 'flex', flexDirection: 'column' }}>
        <div css={goalListHeader}>
          <St목표리스트>목표 리스트</St목표리스트>
          <St목표리스트개수>{objList.length}/10</St목표리스트개수>
        </div>
        <StScrollContainer>
          <ul css={ulStyles}>
            {objList?.map((objListItem) => (
              <GoalItem
                key={objListItem.id}
                {...objListItem}
                currentGoalId={currentGoalId}
                onClickGoal={handleClickGoal}
              />
            ))}
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
