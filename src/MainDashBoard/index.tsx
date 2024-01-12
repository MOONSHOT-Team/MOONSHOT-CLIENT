/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useState } from 'react';

import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);

  const handleShowSideSheet = () => {
    setShowSideSheet(true);
  };

  const handleCloseSideSheet = () => {
    setShowSideSheet(false);
  };

  return (
    <>
      <section css={mainDashboardStyle}>
        <MainDashBoardDrawer />
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
  height: 100vh;
`;
