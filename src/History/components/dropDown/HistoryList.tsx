import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { CloseDropDownIcon, DropDownIcon } from '../../assets/icons';
import { IKeyResult, IObjective, ITask } from '../../type/okrTypes';
import HistoryProgressBar from '../HistoryProgressBar';
import HistoryListDetails from './HistoryListDetails';
import KeyResultList from './KeyResultList';
import TaskList from './TaskList';

const HistoryList: React.FC<IObjective> = ({
  objId,
  title,
  objCategory,
  progress,
  objPeriod,
  krList,
}) => {
  const [isVisable, setIsVisable] = useState<number | null>(null);
  const handleObjectiveClick = (objId: number) => {
    setIsVisable((previousObjId) => (previousObjId === objId ? null : objId));
  };
  return (
    <>
      <ul css={historyListMarginBottom}>
        <StObjectiveContainer
          visibility={isVisable === objId ? 'true' : 'false'}
          onClick={() => handleObjectiveClick(objId)}
        >
          <StObjectiveWrapper>
            {isVisable === objId ? <CloseDropDownIcon /> : <DropDownIcon />}
            <StObjectiveCategory>{objCategory}</StObjectiveCategory>
            <StObjectTitle>{title}</StObjectTitle>
          </StObjectiveWrapper>
          <div css={progressInfo}>
            <HistoryProgressBar currentProgress={progress} maximumProgress={100} />
            <StObjectivePeriod>{objPeriod}</StObjectivePeriod>
          </div>
        </StObjectiveContainer>

        <HistoryListDetails visibility={isVisable === objId}>
          {krList.map(({ krId, krIdx, krTitle, krProgress, taskList }: IKeyResult) => (
            <ul css={KrTaskLayout} key={`${krId}+${krTitle}`}>
              <KeyResultList krIdx={krIdx} krProgress={krProgress} krTitle={krTitle} />

              <div css={TaskLayout}>
                {taskList.map(({ taskId, taskTitle, taskIdx }: ITask) => (
                  <TaskList
                    key={`${taskId}+${taskTitle}`}
                    taskId={taskId}
                    taskTitle={taskTitle}
                    taskIdx={taskIdx}
                  />
                ))}
              </div>
            </ul>
          ))}
        </HistoryListDetails>
      </ul>
    </>
  );
};

export default HistoryList;

const historyListMarginBottom = css`
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;

const progressInfo = css`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StObjectiveContainer = styled.button<{ visibility: string }>`
  display: flex;
  gap: 1.6rem;
  align-items: center;
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
`;

const TaskLayout = css`
  display: flex;
  gap: 1.9rem;
`;
