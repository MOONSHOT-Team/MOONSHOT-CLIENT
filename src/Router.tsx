import {createBrowserRouter}  from 'react-router-dom';
import Error from '@components/Error';
import AddOkr from './AddOkr';
import History from './History';
import Home from './Home';
import MainDashBoard from './MainDashBoard';
import PreviewOkr from './PreviewOkr';
import SignIn from './SignIn';
import Social from './Social';
import MainLayout from '@components/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
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
        path: '/social',
        element: <Social />
      },
    ]
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
])

export default router;