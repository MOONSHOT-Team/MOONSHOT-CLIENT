import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>header</header>
      <main>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

export default MainLayout;
