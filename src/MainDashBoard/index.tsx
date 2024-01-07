import { css } from '@emotion/react';
import { useState } from 'react';

import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import SideSheet from './components/sideSheet/SideSheet';

const MainDashBoard = () => {
  const [showSideSheet] = useState<boolean>(false);
  return (
    <>
      <section css={mainDashboardStyle(showSideSheet)}>
        <MainDashBoardDrawer />
        <article css={{ width: '100%', height: '100%', fontSize: '20px', backgroundColor: 'red' }}>
          okr트리부분
        </article>
      </section>

      {showSideSheet && <SideSheet />}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = (showShideSheet: boolean) => css`
  /* position: absolute; */
  display: flex;
  width: 100vw;
  height: 100vh;
  opacity: ${showShideSheet ? 0.5 : 1};
`;
