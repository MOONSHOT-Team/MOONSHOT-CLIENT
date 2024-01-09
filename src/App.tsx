import { Global, ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';

import globalStyles from './common/styles/globalStyles';
import { theme } from './common/styles/theme';
import PreviewOkrAlertMsg from './PrviewOkr/components/PreviewOkrAlertMsg';
import router from './Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
      <PreviewOkrAlertMsg />
    </ThemeProvider>
  );
};

export default App;
