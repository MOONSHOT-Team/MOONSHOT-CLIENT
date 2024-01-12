import { css } from '@emotion/react';

import ProgressBar from './components/ProgressBar';

const History = () => {
  return (
    <div css={progressBarPosition}>
      History
      <ProgressBar currentProgress={40} maximumProgress={100} />
    </div>
  );
};

export default History;

const progressBarPosition = css`
  width: 29.8rem;
`;
