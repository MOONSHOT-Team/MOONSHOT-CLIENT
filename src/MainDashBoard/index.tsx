/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';
import { GOAL_DATA } from './constants/GOAL_DATA';
import { MOCK_MAIN_OKR_DATA } from './constants/MOCK_MAIN_OKR_DATA';
import { IobjListTypes } from './type/goalItemTypes';
import { IMainData } from './type/MainDashboardDataTypes';

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [objList, setObjList] = useState<IobjListTypes[]>([]);
  const [, setCurrentGoalId] = useState<number>(0);
  const [currentOKRData, setCurrentOKRData] = useState<IMainData>();

  useEffect(() => {
    //서버통신
    setCurrentOKRData(MOCK_MAIN_OKR_DATA);
    setObjList(GOAL_DATA.objList);
  }, []);

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
      <section css={mainDashboardStyle}>
        <MainDashBoardDrawer objList={objList} onChangeCurrentGoalId={handleCurrentGoalId} />
        <MainDashboardOKRTree
          onShowSideSheet={handleShowSideSheet}
          currentOkrData={currentOKRData}
        />
      </section>

      {showSideSheet && <SideSheet isOpen={showSideSheet} onClose={handleCloseSideSheet} />}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
