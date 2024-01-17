import Error from '@components/Error';
import MainLayout from '@components/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';

import AddOkr from './AddOkr';
import AuthGoogle from './Auth/AuthGoogle';
import AuthKakao from './Auth/AuthKakao';
import History from './History';
import MainDashBoard from './MainDashBoard';
import My from './My';
import Nickname from './Nickname';
import Onboarding from './Onboarding';
import PreviewOkr from './PreviewOkr';
import SignIn from './SignIn';
import Social from './Social';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Onboarding />,
    errorElement: <Error />,
    children: [
      {
        path: 'team-moonshot',
        element: <Onboarding />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
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
        path: 'my',
        element: <My />,
      },
      {
        path: 'social',
        element: <Social />,
      },
      {
        path: 'preview-okr',
        element: <PreviewOkr />,
      },
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
    path: '/login/oauth2/code',
    errorElement: <Error />,
    children: [
      {
        path: 'kakao',
        element: <AuthKakao />,
      },
      {
        path: 'google',
        element: <AuthGoogle />,
      },
    ],
  },
]);

export default router;
