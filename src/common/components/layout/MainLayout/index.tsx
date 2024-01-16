import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main css={mainHeight}>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

export default MainLayout;

const mainHeight = css`
  height: calc(100vh - 7.6rem);
  margin-top: 7.6rem;
`;
