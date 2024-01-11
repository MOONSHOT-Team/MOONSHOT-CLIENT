/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useState } from 'react';

import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import SideSheet from './components/sideSheet/SideSheet';

interface IMainDashboardOKRTreeProps {
  onShowSideSheet: () => void;
}

const MainDashboardOKRTree = ({ onShowSideSheet }: IMainDashboardOKRTreeProps) => {
  return (
    <article css={{ flex: '1', backgroundColor: '#ccc' }}>
      okr트리부분
      <button onClick={onShowSideSheet}>Show SideSheet</button>
    </article>
  );
};

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(true);
  const [showCelebrate] = useState(true);

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
  width: 100vw;
  height: 100vh;
`;
