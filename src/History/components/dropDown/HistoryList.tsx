import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { CloseDropDownIcon, DropDownIcon } from '../../assets/icons';
import { IKeyResult, IObjective, ITask } from '../../type/okrTypes';
import HistoryListDetails from './HistoryListDetails';
import ListOrder from './ListOrder';

interface IHistoryListProps {
  year: number;
  objList: IObjective[];
}

const HistoryList: React.FC<IHistoryListProps> = ({ year, objList }) => {
  const [isVisalbe, setIsVisalbe] = useState(false);

  return (
    <>
      <div css={listOrder}>
        <StEachYear>{year}년</StEachYear>
        <ListOrder />
      </div>
      {objList.map(
        ({
          objId,
          title,
          objCategory,
          //   progress,
          objPeriod,
          krList,
        }) => (
          <ul key={`${objId}+${objCategory}`}>
            <StObjectiveContainer onClick={() => setIsVisalbe(!isVisalbe)}>
              <StObjectiveWrapper>
                {isVisalbe ? <CloseDropDownIcon /> : <DropDownIcon />}
                <StObjectiveCategory>{objCategory}</StObjectiveCategory>
                <StObjectTitle>{title}</StObjectTitle>
              </StObjectiveWrapper>
              <div css={OProgressBar}>프로그래스 바 입니다.</div>
              <StObjectivePeriod>{objPeriod}</StObjectivePeriod>
            </StObjectiveContainer>
            <HistoryListDetails visibility={isVisalbe}>
              {krList.map(
                ({
                  krId,
                  krIdx,
                  krTitle,
                  //  krProgress,
                  taskList,
                }: IKeyResult) => (
                  <ul css={KrTaskLayout} key={`${krId}+${krTitle}`}>
                    <StKeyResultContainer>
                      <StKeyResultWrapper>
                        <StOKRIndex>KR {krIdx + 1}</StOKRIndex>
                        <StOKRContent>{krTitle}</StOKRContent>
                      </StKeyResultWrapper>
                      <div css={KrProgressBar}>프로그래스 바 입니다.</div>
                    </StKeyResultContainer>
                    <div css={TaskLayout}>
                      {taskList.map(({ taskId, taskTitle, taskIdx }: ITask) => (
                        <StTaskContainer key={`${taskId}+${taskTitle}`}>
                          <StTaskWrapper>
                            <StOKRIndex>Task {taskIdx + 1}</StOKRIndex>
                            <StOKRContent>{taskTitle}</StOKRContent>
                          </StTaskWrapper>
                        </StTaskContainer>
                      ))}
                    </div>
                  </ul>
                ),
              )}
            </HistoryListDetails>
          </ul>
        ),
      )}
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

const OProgressBar = css`
  width: 29.8rem;
  margin: 0 2.5rem 0 0.4rem;
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

const StKeyResultContainer = styled.article`
  display: flex;
  align-items: center;
  width: 105.8rem;
  height: 5.2rem;
  list-style-type: none;
  background: ${({ theme }) => theme.colors.gray_550};
  border-radius: 6px;
`;

const StKeyResultWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  width: 44.6rem;
  padding-left: 2rem;
`;

const StOKRIndex = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const StOKRContent = styled.p`
  ${({ theme }) => theme.fonts.body_14_regular};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const KrProgressBar = css`
  width: 27.6rem;
  margin-left: 11rem;
`;

const TaskLayout = css`
  display: flex;
  gap: 1.9rem;
`;

const StTaskContainer = styled.li`
  display: flex;
  align-items: center;
  width: 34rem;
  height: 4rem;
  padding-left: 1.6rem;
  list-style-type: none;
  background: ${({ theme }) => theme.colors.gray_600};
  border-radius: 6px;
`;

const StTaskWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;
