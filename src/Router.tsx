import Error from '@components/Error';
import MainLayout from '@components/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';

// import AddOkr from './AddOkr';
import History from './History';
import Home from './Home';
import MainDashBoard from './MainDashBoard';
import PreviewOkr from './PreviewOkr';
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
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);

export default router;
