import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { CloseDropDownIcon, DropDownIcon } from '../../assets/icons';
import { IKeyResult, IObjective, ITask } from '../../type/okrTypes';
import HistoryProgressBar from '../HistoryProgressBar';
import HistoryListDetails from './HistoryListDetails';
import KeyResultList from './KeyResultList';
import ListOrder from './ListOrder';
import TaskList from './TaskList';

interface IHistoryListProps {
  year: number;
  objList: IObjective[];
}

const HistoryList: React.FC<IHistoryListProps> = ({ year, objList }) => {
  const [isVisable, setIsVisable] = useState<number | null>(null);
  const handleObjectiveClick = (objId: number) => {
    setIsVisable((previousObjId) => (previousObjId === objId ? null : objId));
  };
  return (
    <>
      <div css={listOrder}>
        <StEachYear>{year}년</StEachYear>
        <ListOrder />
      </div>

      {objList.map(({ objId, title, objCategory, progress, objPeriod, krList }) => (
        <ul key={`${objId}+${objCategory}`}>
          {
            <StObjectiveContainer onClick={() => handleObjectiveClick(objId)}>
              <StObjectiveWrapper>
                {isVisable ? <CloseDropDownIcon /> : <DropDownIcon />}
                <StObjectiveCategory>{objCategory}</StObjectiveCategory>
                <StObjectTitle>{title}</StObjectTitle>
              </StObjectiveWrapper>
              <HistoryProgressBar currentProgress={progress} maximumProgress={100} />
              <StObjectivePeriod>{objPeriod}</StObjectivePeriod>
            </StObjectiveContainer>
          }

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
      ))}
    </>
  );
};

export default HistoryList;

const listOrder = css`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  width: 105.8rem;
  padding-bottom: 1.2rem;
  margin-top: 3rem;
`;
const StEachYear = styled.p`
  padding-left: 0.2rem;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000} ${({ theme }) => theme.fonts.title_20_semibold};
`;

const StObjectiveContainer = styled.button`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 105.8rem;
  height: 6rem;
  padding: 0 2.4rem;
  margin-bottom: 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border: 1px solid ${({ theme }) => theme.colors.gray_300};
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
  width: 15.5rem;
  ${({ theme }) => theme.fonts.body_12_regular};

  color: ${({ theme }) => theme.colors.gray_250};
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
