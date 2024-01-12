import Error from '@components/Error';
import Drawer from '@components/layout/Drawer';
import MainLayout from '@components/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';

import AddOkr from './AddOkr';
import History from './History';
import Home from './Home';
import MainDashBoard from './MainDashBoard';
import Nickname from './Nickname';
import SignIn from './SignIn';
import Social from './Social';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'sign-in',
        children: [
          { index: true, element: <SignIn /> },
          { path: 'nickname', element: <Nickname /> },
        ],
      },
      {
        path: 'social',
        element: <Social />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <>
        <MainLayout>
          <Drawer />
        </MainLayout>
      </>
    ),
    children: [
      {
        path: 'dashboard',
        element: <MainDashBoard />,
      },
      {
        path: 'add-okr',
        element: <AddOkr />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/redirect',
    children: [
      {
        path: 'kakao',
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
