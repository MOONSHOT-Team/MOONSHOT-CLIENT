import Error from '@components/Error';
import MainLayout from '@components/Layout/MainLayout';
import Loading from '@components/Loading';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Onboarding from './Onboarding';
import OnboardingLayout from './Onboarding/components/layout/OnboardingLayout';

const AddOkr = lazy(() => import('./AddOkr'));
const AuthGoogle = lazy(() => import('./Auth/AuthGoogle'));
const AuthKakao = lazy(() => import('./Auth/AuthKakao'));
const Hyeonjin = lazy(() => import('./esterEgg/components/Hyeonjin'));
const History = lazy(() => import('./History'));
const MainDashBoard = lazy(() => import('./MainDashBoard'));
const My = lazy(() => import('./My'));
const Nickname = lazy(() => import('./Nickname'));
const TeamMoonshot = lazy(() => import('./Onboarding/components/teamMoonshot/TeamMoonshot'));
const PreviewOkr = lazy(() => import('./PreviewOkr'));
const SignIn = lazy(() => import('./SignIn'));
const Social = lazy(() => import('./Social'));

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
