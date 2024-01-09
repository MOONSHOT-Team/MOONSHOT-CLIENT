import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>header</header>
      <main css={mainHeight}>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

const mainHeight = css`
  height: calc(100vh - 7.6rem);
  overflow-y: auto;
`;

export default MainLayout;
