/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useState } from 'react';

import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [showCelebrate] = useState(false); //축하 모션 보이는 여부 플래그

  const handleShowSideSheet = () => {
    setShowSideSheet(true);
  };

  const handleCloseSideSheet = () => {
    setShowSideSheet(false);
  };

  return (
    <>
      {showCelebrate ? (
        <>
          <CelebrateMotion />
        </>
      ) : (
        <>
          <section css={mainDashboardStyle}>
            <MainDashBoardDrawer />
            <MainDashboardOKRTree onShowSideSheet={handleShowSideSheet} />
          </section>

          {showSideSheet && <SideSheet isOpen={showSideSheet} onClose={handleCloseSideSheet} />}
        </>
      )}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
`;
