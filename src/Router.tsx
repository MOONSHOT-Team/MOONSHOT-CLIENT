import {createBrowserRouter}  from 'react-router-dom';
import Error from '@components/Error';
import MainLayout from '@components/MainLayout';
import AddOkr from './AddOkr';
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
        element: <Home />
      },
      {
        path: '/add-okr',
        element: <AddOkr />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/main-dashboard',
        element: <MainDashBoard />
      },
      {
        path: '/preview-okr',
        element: <PreviewOkr />
      },
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/social',
        element: <Social />
      },
    ]
  }
])

export default router;