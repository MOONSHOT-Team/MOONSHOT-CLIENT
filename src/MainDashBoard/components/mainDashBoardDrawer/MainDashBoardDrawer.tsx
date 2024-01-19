import { css } from '@emotion/react';
import styled from '@emotion/styled';
import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { IcUnion } from '../../assets/icons';
import { IObjListTypes } from '../../type/goalItemTypes';
import GoalItem from './GoalItem';

interface IDrawerProps {
  objList: IObjListTypes[];
  onChangeCurrentGoalId: (id: number) => void;
  handleClickAddObjcBtn: () => void;
  handleChangeState?: (state: number) => void;
  objListSize: number;
  objId: number;
  showState: string;
}

const MainDashBoardDrawer = ({
  objList,
  onChangeCurrentGoalId,
  handleClickAddObjcBtn,
  handleChangeState,
  objListSize,
  objId,
  showState,
}: IDrawerProps) => {
  const [currentGoalId, setCurrentGoalId] = useState(objId);
  const [goals, setGoals] = useState(objList);
  const [isRightClick, setIsRightClick] = useState(false);

  const handleClickGoal = (id: number) => {
    setCurrentGoalId(id);
    onChangeCurrentGoalId(id);
  };

  useEffect(() => {
    setGoals(objList);
  }, [objList]);

  //dnd움직이는 함수
  const moveGoal = useCallback((dragIndex: number, hoverIndex: number) => {
    setGoals((prevItems) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex]],
        ],
      }),
    );
  }, []);

  return (
    <StContainer>
      <div>
        <StAddGoalBtn
          type="button"
          isAble={!objList || objListSize < 10}
          disabled={objListSize < 10 || !objList ? false : true}
          onClick={handleClickAddObjcBtn}
        >
          <IcUnion />
          목표 추가하기
        </StAddGoalBtn>

        <div css={goalListHeader}>
          <St목표리스트>목표 리스트</St목표리스트>
          <St목표리스트개수>{objListSize ? objListSize : 0}/10</St목표리스트개수>
        </div>
      </div>
      {objList ? (
        <>
          <div css={{ height: 'calc(100% - 10rem)', display: 'flex', flexDirection: 'column' }}>
            <StScrollContainer $isRightClick={isRightClick}>
              <DndProvider backend={HTML5Backend}>
                <ul css={ulStyles}>
                  {goals?.map((objListItem, index) => (
                    <GoalItem
                      key={objListItem.id}
                      {...objListItem}
                      currentGoalId={currentGoalId}
                      onClickGoal={handleClickGoal}
                      index={index}
                      moveGoal={moveGoal}
                      setIsRightClick={setIsRightClick}
                      handleChangeState={handleChangeState}
                      showState={showState}
                    />
                  ))}
                </ul>
              </DndProvider>
            </StScrollContainer>
          </div>
        </>
      ) : (
        <StNullText>
          <p>추가한 목표가 없습니다.</p>
        </StNullText>
      )}
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

const StAddGoalBtn = styled.button<{ isAble: boolean }>`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: 18.8rem;
  height: 3.6rem;
  margin: 2.4rem 2.2rem;
  color: ${({ theme, isAble }) => (isAble ? theme.colors.gray_000 : theme.colors.gray_200)};
  background-color: ${({ theme, isAble }) =>
    isAble ? theme.colors.main_darkpurple : theme.colors.gray_500};

  ${({ theme }) => theme.fonts.btn_14_semibold};

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

const StScrollContainer = styled.div<{ $isRightClick: boolean }>`
  flex: 1;
  padding: ${({ $isRightClick }) =>
    $isRightClick ? '0 2.3rem 2.2rem 2.2rem' : '0 1rem 2.2rem 2.2rem'};
  overflow-y: ${({ $isRightClick }) => ($isRightClick ? 'hidden' : 'scroll')};

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

const StNullText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 23.9rem;
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts.body_12_medium};
`;
