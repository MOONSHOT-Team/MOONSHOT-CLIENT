/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getDashBoardData } from './apis/fetcher';
import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [showCelebrate] = useState(false); //축하 모션 보이는 여부 플래그
  const [currentGoalId, setCurrentGoalId] = useState<number>();
  const [currentKrId, setCurrentKrId] = useState<number>(0);
  const navigator = useNavigate();

  //동적 파라미터 url
  const url = currentGoalId ? `/v1/objective?objectiveId=${currentGoalId}` : '/v1/objective';
  const { data: treeData } = useSWR(url, getDashBoardData);

  useEffect(() => {
    if (!treeData) return;
    if (treeData.status === 404) {
      navigator('/add-okr');
    }
  }, [treeData, navigator]);

  const okrTreeData = treeData?.data.tree;
  const goalListTreeData = treeData?.data.objList;

  const handleShowSideSheet = (id: number) => {
    setCurrentKrId(id);
    setShowSideSheet(true);
    console.log(id);
  };

  const handleCloseSideSheet = () => {
    setShowSideSheet(false);
  };

  const handleCurrentGoalId = (id: number) => {
    setCurrentGoalId(id);
  };

  return (
    <>
      {showCelebrate ? (
        <>
          <CelebrateMotion />
        </>
      ) : (
        <>
          {goalListTreeData && goalListTreeData.length > 0 && (
            <section css={mainDashboardStyle}>
              <MainDashBoardDrawer
                objList={goalListTreeData}
                onChangeCurrentGoalId={handleCurrentGoalId}
              />
              <MainDashboardOKRTree
                onShowSideSheet={handleShowSideSheet}
                currentOkrData={okrTreeData}
              />
            </section>
          )}
          {showSideSheet && (
            <SideSheet
              isOpen={showSideSheet}
              onClose={handleCloseSideSheet}
              keyResultId={currentKrId}
            />
          )}
        </>
      )}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
