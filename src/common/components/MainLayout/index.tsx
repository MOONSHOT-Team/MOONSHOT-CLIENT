import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <header>header</header>
      <main>
        <Outlet />
      </main>
      {/* <footer>footer</footer> */}
    </>
  )
};

export default MainLayout;