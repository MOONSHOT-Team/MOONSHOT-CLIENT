import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, useState } from 'react';

import { IcDropDown } from '../../assets/icons';
import { IKeyResult, IObjective, ITask } from '../../type/okrTypes';
import HistoryProgressBar from '../HistoryProgressBar';
import HistoryListDetails from './HistoryListDetails';
import KeyResultList from './KeyResultList';
import TaskList from './TaskList';

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
      {children}
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
      {children}
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

const HistoryList = ({
  objId,
  title,
  objCategory,
  progress,
  objPeriod,
  isLast,
  krList,
}: IObjective) => {
  const [isShowKR, setIsShowKR] = useState(false);
  const [isVisible, setIsVisible] = useState<number | null>(null);
  const handleObjectiveClick = (objId: number) => {
    setIsVisible((previousObjId) => (previousObjId === objId ? null : objId));
  };

  const handleShowKR = () => {
    setIsShowKR((prev) => !prev);
  };

  return (
    <>
      <HistoryObjectiveItem
        category="성장"
        objective="자기 개발하기"
        progress={50}
        period="2024. 02. 07 - 2024. 02. 20"
        isShowKR={isShowKR}
        onClick={handleShowKR}
      >
        <HistoryKeyResultItem
          index={0}
          keyResult="재접속 방문자 방문자 지속시간 상승 : 100%"
          progress={50}
        >
          <HistoryTaskItem index={0} task="새로운 웹사이트를 2월까지 오픈한다" />
        </HistoryKeyResultItem>
        <HistoryKeyResultItem
          index={0}
          keyResult="재접속 방문자 방문자 지속시간 상승 : 100%"
          progress={50}
        >
          <HistoryTaskItem index={0} task="새로운 웹사이트를 2월까지 오픈한다" />
        </HistoryKeyResultItem>
      </HistoryObjectiveItem>
      <StHistoryListWrapperUl $isLast={isLast}>
        <StObjectiveContainer
          visibility={isVisible === objId ? 'true' : 'false'}
          onClick={() => handleObjectiveClick(objId)}
        >
          <StObjectiveWrapper>
            <StToggleIcon isVisible={isVisible === objId} />
            <StObjectiveCategory>{objCategory}</StObjectiveCategory>
            <StObjectTitle>{title}</StObjectTitle>
          </StObjectiveWrapper>
          <div css={progressInfo}>
            <HistoryProgressBar currentProgress={progress} maximumProgress={100} />
            <StObjectivePeriod>{objPeriod}</StObjectivePeriod>
          </div>
        </StObjectiveContainer>

        <HistoryListDetails visibility={isVisible === objId}>
          {krList.map(({ krId, krIdx, krTitle, krProgress, taskList }: IKeyResult) => (
            <ul css={KrTaskLayout} key={`${krId}+${krTitle}`}>
              <KeyResultList krIdx={krIdx} krProgress={krProgress} krTitle={krTitle} />

              <div css={TaskLayout}>
                {taskList.map(({ taskId, taskTitle, taskIdx }: ITask) => (
                  <TaskList
                    key={`${taskTitle}+${taskTitle}`}
                    taskId={taskId}
                    taskTitle={taskTitle}
                    taskIdx={taskIdx}
                  />
                ))}
              </div>
            </ul>
          ))}
        </HistoryListDetails>
      </StHistoryListWrapperUl>
    </>
  );
};

export default HistoryList;

const StHistoryListWrapperUl = styled.ul<{ $isLast: boolean | undefined }>`
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  &:last-child > li {
    margin-bottom: ${({ $isLast }) => $isLast && '0'};
  }
`;

const progressInfo = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StObjectiveContainer = styled.button<{ visibility: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 105.8rem;
  height: 6rem;
  padding: 0 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border: 1px solid
    ${({ theme, visibility }) => (visibility === 'true' ? theme.colors.gray_300 : 'none')};
  border-radius: 6px;
`;

const StObjectiveWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 52.8rem;
`;

const StToggleIcon = styled(IcDropDown)<{ isVisible: boolean }>`
  transition: all 0.5s ease;
  transform: ${({ isVisible }) => (isVisible ? 'rotate(-180deg)' : '')};
`;

const StObjectiveCategory = styled.p`
  padding: 8px 10px;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_150};
  background-color: ${({ theme }) => theme.colors.gray_650};
  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;
`;

const StObjectTitle = styled.p`
  ${({ theme }) => theme.fonts.body_14_semibold};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const StObjectivePeriod = styled.p`
  margin-left: 4.4rem;
  color: ${({ theme }) => theme.colors.gray_250};

  ${({ theme }) => theme.fonts.body_12_regular};
`;

const KrTaskLayout = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

const TaskLayout = css`
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.9rem;
`;
