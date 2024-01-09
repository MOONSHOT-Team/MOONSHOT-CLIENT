import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* 헤더에 fixed position을 주기 위해 수정했습니다. 충돌 시 이 브랜치거 말고 다른 브랜치걸로 충돌해결 하세요!! */}
      <header css={{ position: 'fixed' }}>header</header>
      <main>{children || <Outlet />}</main>
      {/* <footer>footer</footer> */}
    </>
  );
};

export default MainLayout;
