import Modal from '@components/Modal';
import { Global, ThemeProvider } from '@emotion/react';
import useModal from '@hooks/useModal';
import { RouterProvider } from 'react-router-dom';

import globalStyles from './common/styles/globalStyles';
import { theme } from './common/styles/theme';
import router from './Router';

const App = () => {
  const { modalRef, handleShowModal } = useModal();

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
      <button style={{ color: 'red' }} onClick={handleShowModal}>
        CLICK ME!!!
      </button>
      <Modal ref={modalRef}>
        <p>Modal</p>
        <form method="dialog">
          <button style={{ color: 'red' }}>CLOSE ME</button>
        </form>
      </Modal>
    </ThemeProvider>
  );
};

export default App;
