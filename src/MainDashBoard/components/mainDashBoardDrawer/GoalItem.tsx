import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getCategoryColor } from '@utils/getCategoryColor';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { IRightClickStateTypes } from '../..';
import { patchSwapGoalIndex } from '../../apis/fetcher';
import { IcDropDown, IcDropUp, IcEllipse } from '../../assets/icons';
import { IObjListTypes } from '../../type/goalItemTypes';
import { ItemTypes } from '../../type/itemType';
import MainDashProgressBar from './MainDashProgressBar';
import RightClickBox from './RightClickBox';

interface IGoalItemProps extends IObjListTypes {
  showState: string;
  handleChangeState?: (state: number) => void;
  rightClickState: IRightClickStateTypes;
  setRightClickState: React.Dispatch<React.SetStateAction<IRightClickStateTypes>>;
  handleClickDelObjBtn: () => void;
  handleClickCompleteObjBtn: () => void;
}

const GoalItem: React.FC<IGoalItemProps> = ({
  id,
  title,
  content,
  category,
  date,
  progress,
  currentGoalId,
  showState,
  index = 0,
  onClickGoal,
  moveGoal,
  handleChangeState,
  rightClickState,
  setRightClickState,
  handleClickDelObjBtn,
  handleClickCompleteObjBtn,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const navigate = useNavigate();

  if (showState === 'ADD_SELECT_METHOD') {
    currentGoalId = -1;
  }

  const handleRightClickGoal = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    e.preventDefault();

    //전체 overflow 방지
    document.body.style.overflow = 'hidden';

    setRightClickState((prev) => {
      return {
        ...prev,
        isRightClick: true,
        rightClickId: id,
        rightClickPoints: { x: e.pageX, y: e.pageY },
      };
    });
  };

  const handleOnClick = () => {
    onClickGoal?.(id);
    handleChangeState?.(0);
  };

  //서버 통신 함수
  const updateSwapIndex = async (id: number, dropIdx: number) => {
    const data = {
      id,
      target: 'OBJECTIVE',
      idx: dropIdx,
    };

    try {
      await patchSwapGoalIndex('/v1/index', data);
    } catch {
      navigate('/error');
    }
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.GOAL,
    item: { id, index },
    collect: (monitor) => {
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

      moveGoal?.(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop(item: { index: number }) {
      //목표리스트 dnd 서버통신
      updateSwapIndex(id, item.index);
    },
  });

  drag(drop(ref));

  return (
    <StGoalItemLi
      bgColor={currentGoalId === id}
      onClick={handleOnClick}
      ref={ref}
      isDragging={isDragging}
      onContextMenu={(e) => handleRightClickGoal(e, id)}
    >
      {rightClickState.isRightClick && (
        <RightClickBox
          setRightClickState={setRightClickState}
          rightClickPoints={rightClickState.rightClickPoints}
          handleClickDelObjBtn={handleClickDelObjBtn}
          handleClickCompleteObjBtn={handleClickCompleteObjBtn}
        />
      )}
      <StGoalItemContainer>
        <header css={goalItemHeader}>
          <span css={goalItemCategoryBox}>
            <StIcEllipse color={getCategoryColor(category)} />
            <StGoalItemCategory>{category}</StGoalItemCategory>
          </span>
          <StGoalItemDate>{date}</StGoalItemDate>
        </header>
        <article css={goalItemArticle}>
          <StGoalItemTitle>{title}</StGoalItemTitle>
          <i>{currentGoalId === id ? <IcDropUp /> : <IcDropDown />}</i>
        </article>
        {currentGoalId === id && <StGoalItemContent>{content}</StGoalItemContent>}
      </StGoalItemContainer>
      <footer css={ProgressBarContainer}>
        <MainDashProgressBar
          currentProgress={progress}
          progressBarColor={currentGoalId === id ? '#5B5B5B' : '#444444'}
          progressValueColor={currentGoalId === id ? '#FFFFFF' : '#8E8E8E'}
          textColor={'#A7A7A7'}
          isCurrentProgress={false}
        />
      </footer>
    </StGoalItemLi>
  );
};

export default GoalItem;

const StGoalItemLi = styled.li<{ bgColor: boolean; isDragging: boolean }>`
  position: relative;
  width: 18.8rem;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors.gray_500 : theme.colors.gray_550};
  border-radius: 6px;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
`;

const StGoalItemContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.9rem 1.2rem 1.5rem;
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
`;

const StGoalItemTitle = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};

  word-break: break-all;
`;

const StGoalItemContent = styled.p`
  margin-top: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_10_regular};

  word-break: break-all;
`;

const StIcEllipse = styled(IcEllipse)<{ color?: string }>`
  & > circle {
    fill: ${({ color }) => color};
  }
`;

const ProgressBarContainer = css`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
