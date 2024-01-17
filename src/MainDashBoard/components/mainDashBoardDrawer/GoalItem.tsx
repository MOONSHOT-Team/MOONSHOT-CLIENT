import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getCategoryColor } from '@utils/getCategoryColor';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { patchSwapGoalIndex } from '../../apis/fetcher';
import { IcDropDown, IcDropUp, IcEllipse } from '../../assets/icons';
import useContextMenu from '../../hooks/useContextMenu';
import { IObjListTypes } from '../../type/goalItemTypes';
import { ItemTypes } from '../../type/ItemTypes';
import MainDashProgressBar from './MainDashProgressBar';
import RightClickBox from './RightClickBox';

interface IGoalItemProps extends IObjListTypes {
  setIsRightClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoalItem: React.FC<IGoalItemProps> = ({
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
  setIsRightClick,
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  const [rightClickedGoalId, setRightClickedGoalId] = useState<number>();

  const { rightClicked, setRightClicked, rightClickPoints, setRightClickPoints } = useContextMenu();

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

  //서버 통신 함수
  const updateSwapIndex = async (id: number, dropIdx: number) => {
    const data = {
      id: id,
      target: 'OBJECTIVE',
      idx: dropIdx,
    };

    try {
      await patchSwapGoalIndex('/v1/index', data);
    } catch (err) {
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
    <StGoalItemli
      bgColor={currentGoalId === id}
      onClick={handleOnClick}
      ref={ref}
      isDragging={isDragging}
      onContextMenu={(e) => handleRightClickItem(e, id)}
    >
      {rightClicked && (
        <RightClickBox
          setIsRightClick={setIsRightClick}
          rightClickPoints={rightClickPoints}
          handleClickComplete={handleClickComplete}
          handleClickDelete={handleClickDelete}
        />
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
  width: 18.8rem;
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
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};

  word-break: keep-all;
`;

const StGoalItemContent = styled.p`
  margin-top: 1.2rem;
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
