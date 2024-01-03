import {createBrowserRouter}  from 'react-router-dom';
import Error from '@components/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>123</div>,
    errorElement: <Error />
  }
])

export default router;