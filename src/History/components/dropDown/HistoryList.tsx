import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, useState } from 'react';

import { IcDropDown } from '../../assets/icons';
import { IObjective } from '../../type/okrTypes';
import HistoryProgressBar from '../HistoryProgressBar';

interface IShowKRType {
  isShowKR: boolean;
}

interface IHistoryObjectiveItemProps extends IShowKRType, ComponentProps<'div'> {
  category: string;
  objective: string;
  progress: number;
  period: string;
}

const HistoryObjectiveItem = ({
  category,
  objective,
  progress,
  period,
  isShowKR,
  ...props
}: IHistoryObjectiveItemProps) => {
  const { children } = props;

  return (
    <>
      <StWrapper isShowKR={isShowKR} {...props}>
        <div css={objectiveItemContentLeft}>
          <StDropDownIcon isShowKR={isShowKR} />
          <StCategory>{category}</StCategory>
          <StObjective>{objective}</StObjective>
        </div>
        <div css={objectiveItemContentRight}>
          <HistoryProgressBar currentProgress={progress} maximumProgress={100} />
          <StPeriod>{period}</StPeriod>
        </div>
      </StWrapper>
      {isShowKR && children}
    </>
  );
};

const objectiveItemContentLeft = css`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const objectiveItemContentRight = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  width: 47.8rem;
`;

const StWrapper = styled.div<IShowKRType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 105.8rem;
  height: 6rem;
  padding: 0 2.4rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border: ${({ theme, isShowKR }) =>
    isShowKR ? `1px solid ${theme.colors.gray_300}` : `1px solid ${theme.colors.gray_500}`};
  border-radius: 6px;
`;

const StDropDownIcon = styled(IcDropDown)<IShowKRType>`
  transition: all 0.5s ease;
  transform: ${({ isShowKR }) => (isShowKR ? 'rotate(-180deg)' : '')};
`;

const StCategory = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.7rem;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_150};
  background-color: ${({ theme }) => theme.colors.gray_650};
  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const StObjective = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StPeriod = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};

  ${({ theme }) => theme.fonts.body_12_regular};
`;

interface IHistoryKeyResultItemProps extends ComponentProps<'div'> {
  index: number;
  keyResult: string;
  progress: number;
}

const HistoryKeyResultItem = ({
  index,
  keyResult,
  progress,
  children,
}: IHistoryKeyResultItemProps) => {
  return (
    <>
      <StKeyResultWrapper>
        <div css={keyResultItemContentLeft}>
          <StKeyResultIndex>KR {index + 1}</StKeyResultIndex>
          <StKeyResult>{keyResult}</StKeyResult>
        </div>
        <div css={keyResultItemContentRight}>
          <div css={keyResultProgressbar}>
            <ProgressBar currentProgress={progress} maximumProgress={100} />
          </div>
          <StKeyResultProgressNumber>{progress}% 달성</StKeyResultProgressNumber>
        </div>
      </StKeyResultWrapper>
      {children && <div css={taskAlign}>{children}</div>}
    </>
  );
};

const keyResultItemContentLeft = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const keyResultItemContentRight = css`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 27.6rem;
  margin-right: 18.6rem;
`;

const keyResultProgressbar = css`
  width: 20rem;
`;

const taskAlign = css`
  display: flex;
  gap: 1.9rem;
  align-items: center;
`;

const StKeyResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 105.8rem;
  height: 5.2rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-radius: 6px;
`;

const StKeyResultIndex = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const StKeyResult = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_regular};
`;

const StKeyResultProgressNumber = styled.span`
  color: ${({ theme }) => theme.colors.gray_300};

  ${({ theme }) => theme.fonts.body_13_medium};
`;

interface IHistoryTaskItemProps {
  index: number;
  task: string;
}

const HistoryTaskItem = ({ index, task }: IHistoryTaskItemProps) => {
  return (
    <StTaskWrapper>
      <StTaskIndex>Task {index + 1}</StTaskIndex>
      <StTask>{task}</StTask>
    </StTaskWrapper>
  );
};

const StTaskWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 33.333%;
  min-width: 34rem;
  height: 4rem;
  padding-left: 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 6px;
`;

const StTaskIndex = styled.span`
  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const StTask = styled.span`
  ${({ theme }) => theme.fonts.body_14_regular};
`;

const HistoryList = ({ krList, objCategory, objPeriod, progress, title }: IObjective) => {
  const [isShowKR, setIsShowKR] = useState(false);

  const handleShowKR = () => {
    setIsShowKR((prev) => !prev);
  };

  return (
    <>
      <HistoryObjectiveItem
        category={objCategory}
        objective={title}
        progress={progress}
        period={objPeriod}
        isShowKR={isShowKR}
        onClick={handleShowKR}
      >
        <div css={addGapBetweenItems}>
          {krList.map(({ krIdx, krProgress, krTitle, taskList }) => (
            <HistoryKeyResultItem
              key={`${krTitle}-${krIdx}`}
              index={krIdx}
              keyResult={krTitle}
              progress={krProgress}
            >
              {taskList.map(({ taskIdx, taskTitle }) => (
                <HistoryTaskItem key={`${taskTitle}-${taskIdx}`} index={taskIdx} task={taskTitle} />
              ))}
            </HistoryKeyResultItem>
          ))}
        </div>
      </HistoryObjectiveItem>
    </>
  );
};

export default HistoryList;

const addGapBetweenItems = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  justify-content: center;
  margin-bottom: 3rem;
`;
