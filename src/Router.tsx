import {createBrowserRouter}  from 'react-router-dom';
import Error from '@components/Error';
import MainLayout from '@components/MainLayout';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />
      }
    ]
  }
])

export default router;