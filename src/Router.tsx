import { createBrowserRouter }  from 'react-router-dom';
import Error from '@components/Error';
import AddOkr from './AddOkr';
import History from './History';
import Home from './Home';
import MainDashBoard from './MainDashBoard';
import SignIn from './SignIn';
import Social from './Social';
import MainLayout from '@components/layout/MainLayout';
import Drawer from '@components/layout/Drawer';

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
        path: 'history',
        element: <History />
      },
      {
        path: 'social',
        element: <Social />
      },
    ]
  },
  {
    path: '/',
    element:  <><MainLayout><Drawer /></MainLayout></>,
    children: [
      {
        path: 'dashboard',
        element: <MainDashBoard />
      },
      {
        path: 'add-okr',
        element: <AddOkr />
      },
    ]
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
])

export default router;