import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

export default MainLayout;
