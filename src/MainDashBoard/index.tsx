/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';
import { GOAL_DATA } from './constants/GOAL_DATA';
import { IobjListTypes } from './type/goalItemTypes';

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [objList, setObjList] = useState<IobjListTypes[]>([]);

  useEffect(() => {
    //서버통신
    setObjList(GOAL_DATA.objList);
  }, []);

  const handleShowSideSheet = () => {
    setShowSideSheet(true);
  };

  const handleCloseSideSheet = () => {
    setShowSideSheet(false);
  };

  return (
    <>
      <section css={mainDashboardStyle}>
        <MainDashBoardDrawer objList={objList} />
        <MainDashboardOKRTree onShowSideSheet={handleShowSideSheet} />
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
