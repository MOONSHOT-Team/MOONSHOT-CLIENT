import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <ProgressBar currentProgress={1} maximumProgress={5} />
      <main css={mainHeight}>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

export default MainLayout;

const mainHeight = css`
  height: calc(100vh - 7.6rem);
  padding-top: 7.6rem;
`;
