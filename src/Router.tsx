import Error from '@components/Error';
import MainLayout from '@components/Layout/MainLayout';
import Loading from '@components/Loading';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AddOkr from './AddOkr';
import AuthGoogle from './Auth/AuthGoogle';
import AuthKakao from './Auth/AuthKakao';
import Hyeonjin from './esterEgg/components/Hyeonjin';
import History from './History';
import MainDashBoard from './MainDashBoard';
import My from './My';
import Nickname from './Nickname';
import Onboarding from './Onboarding';
import OnboardingLayout from './Onboarding/components/layout/OnboardingLayout';
import TeamMoonshot from './Onboarding/components/teamMoonshot/TeamMoonshot';
import PreviewOkr from './PreviewOkr';
import SignIn from './SignIn';
import Social from './Social';

const router = createBrowserRouter([
  {
    path: '/',
    element: <OnboardingLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Onboarding />,
      },
      {
        path: 'team-moonshot',
        element: <TeamMoonshot />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
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
      {
        path: 'add-okr',
        element: <AddOkr />,
      },
      {
        path: 'loading',
        element: <Loading />,
      },
      {
        path: 'error',
        element: <Error />,
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
  {
    path: '/hyeonjin',
    element: <Hyeonjin />,
  },
]);

export default router;
