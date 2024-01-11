import ProgressBar from '@components/ProgressBar';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>header</header>
      <ProgressBar currentProgress={1} maximumProgress={5} />
      <main>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

export default MainLayout;
