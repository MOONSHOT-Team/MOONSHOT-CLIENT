import { css } from '@emotion/react';

import HistoryDrawer from './components/HistoryDrawer';

const History = () => {
  return (
    <div css={historyDrawer}>
      <HistoryDrawer />
    </div>
  );
};

export default History;

const historyDrawer = css`
  position: relative;
  width: 23.2rem;
`;
