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
  const [currentGlaoId, setCurrentGoalId] = useState<number>();
  const navigator = useNavigate();

  //동적 파라미터 url
  const url = currentGlaoId ? `/v1/objective?objectiveId=${currentGlaoId}` : '/v1/objective';
  const { data } = useSWR(url, getDashBoardData);

  useEffect(() => {
    if (!data) return;
    if (data.status === 404) {
      navigator('/add-okr');
    }
  }, [data, navigator]);

  const okrTreeData = data?.data.tree;
  const goalListData = data?.data.objList;

  const handleShowSideSheet = () => {
    setShowSideSheet(true);
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
          {goalListData && goalListData.length > 0 && (
            <section css={mainDashboardStyle}>
              <MainDashBoardDrawer
                objList={goalListData}
                onChangeCurrentGoalId={handleCurrentGoalId}
              />
              <MainDashboardOKRTree
                onShowSideSheet={handleShowSideSheet}
                currentOkrData={okrTreeData}
              />
            </section>
          )}
          {showSideSheet && <SideSheet isOpen={showSideSheet} onClose={handleCloseSideSheet} />}
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
