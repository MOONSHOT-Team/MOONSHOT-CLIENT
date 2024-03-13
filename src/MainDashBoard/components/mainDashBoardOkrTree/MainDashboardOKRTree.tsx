import OkrTreeTemplate from '@components/okrTree/template/OkrTreeTemplate';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getDashBoardData } from '../../apis/fetcher';
import { imgNoneOkr } from '../../assets/images';
import { OKRTREEVIEWS } from '../../constants/OKRTREEVIEWS';
import { IMainData } from '../../type/mainDashboardDataType';
import { EditKrNodes } from '../editOkrTree/EditKrNodes';
import EditObjectNode from '../editOkrTree/EditObjectNode';
import { EditTaskNodes } from '../editOkrTree/EditTaskNodes';
import EditBtn from './EditBtn';
import { MainDashKrNodes } from './MainDashKrNodes';
import MainDashObjectNode from './MainDashObjectNode';
import { MainDashTaskNodes } from './MainDashTaskNodes';

interface IMainDashboardOKRTreeProps {
  currentOkrData: IMainData;
  onShowSideSheet: (krId: number | undefined) => void;
}

const MainDashboardOKRTree = ({ onShowSideSheet, currentOkrData }: IMainDashboardOKRTreeProps) => {
  const [state, setState] = useState(OKRTREEVIEWS[0]);
  const [editKrId, setEditKrId] = useState<number | undefined>();
  const [editKrList, setEditKrList] = useState<IKeyResultTypes[]>(currentOkrData?.krList);
  const url = currentOkrData.objId
    ? `/v1/objective?objectiveId=${currentOkrData.objId}`
    : '/v1/objective';
  const { data } = useSWR(url, getDashBoardData);

  useEffect(() => {
    setState(OKRTREEVIEWS[0]);
    setEditKrList(currentOkrData?.krList);
  }, [currentOkrData]);

  useEffect(() => {
    setEditKrList(data?.data.tree.krList);
  }, [data]);

  const handleAddTask = (krId: number | undefined) => {
    if (!krId) return;
    const thisKrIdx = editKrList.findIndex((obj) => obj.krId === krId);
    const thisTaskList = editKrList[thisKrIdx].taskList;
    const newTask = { taskIdx: thisTaskList.length, taskTitle: '' };
    const updatedEditKrList = editKrList.map((kr) => {
      if (kr.krId === krId) {
        return {
          ...kr,
          taskList: [...kr.taskList, newTask], // 해당 객체의 taskList에 newTask를 추가
        };
      }
      return kr;
    });
    setEditKrList(updatedEditKrList);
    setEditKrId(krId);
  };

  const renderOKRTree = () => {
    switch (state) {
      case OKRTREEVIEWS[0]:
        return (
          <article css={okrTreeContainer}>
            <EditBtn state={state} setState={setState} />
            <div css={okrTree}>
              <OkrTreeTemplate
                ObjNode={() => (
                  <MainDashObjectNode objValue={currentOkrData?.objTitle} objStroke="#7165CA" />
                )}
                keyResultList={currentOkrData?.krList}
                KrNodes={(krIdx) => (
                  <MainDashKrNodes
                    krIdx={krIdx}
                    krList={currentOkrData.krList[krIdx]}
                    onShowSideSheet={onShowSideSheet}
                  />
                )}
                TaskNodes={(isFirstChild, krIdx, taskIdx) => (
                  <MainDashTaskNodes
                    isFirstChild={isFirstChild}
                    taskIdx={taskIdx}
                    taskList={currentOkrData.krList[krIdx]?.taskList}
                  />
                )}
              />
            </div>
          </article>
        );
      //edit
      case OKRTREEVIEWS[1]:
        return (
          <article css={okrTreeContainer}>
            <EditBtn state={state} setState={setState} />
            <div css={okrTree}>
              <OkrTreeTemplate
                ObjNode={() => (
                  <EditObjectNode
                    objValue={currentOkrData?.objTitle}
                    objStroke="#7165CA"
                    objId={currentOkrData?.objId}
                    krListLen={currentOkrData?.krList.length}
                  />
                )}
                keyResultList={editKrList}
                KrNodes={(krIdx) => (
                  <EditKrNodes
                    krIdx={krIdx}
                    krList={editKrList[krIdx]}
                    handleAddTask={handleAddTask}
                    krId={editKrList[krIdx].krId}
                  />
                )}
                TaskNodes={(isFirstChild, krIdx, taskIdx) => (
                  <EditTaskNodes
                    isFirstChild={isFirstChild}
                    taskIdx={taskIdx}
                    taskList={editKrList[krIdx]?.taskList}
                    editKrId={editKrId}
                    objId={currentOkrData?.objId}
                  />
                )}
              />
            </div>
          </article>
        );
    }
  };

  return (
    <>
      {currentOkrData ? (
        <>{renderOKRTree()}</>
      ) : (
        <section css={okrTreeNoneContainer}>
          <img src={imgNoneOkr} alt="okr이 없습니다" css={{ width: '11.1rem' }} />
          <StNoneOkrText>
            <p>목표를 설정해</p>
            <p>달을 향한 첫 걸음을 시작해보세요</p>
          </StNoneOkrText>
        </section>
      )}
    </>
  );
};

export default MainDashboardOKRTree;

const okrTreeContainer = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% - 7.6rem);
`;

const okrTreeNoneContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 7.6rem);
`;

const okrTree = css`
  padding: 5rem 9.8rem 5rem 5rem;
`;

const StNoneOkrText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.44rem;
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_400};
`;
