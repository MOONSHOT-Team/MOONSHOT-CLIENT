import Loading from '@components/Loading';
import { Global, ThemeProvider } from '@emotion/react';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import globalStyles from './common/styles/globalStyles';
import { theme } from './common/styles/theme';
import router from './Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
