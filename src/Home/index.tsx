import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';

const Home = () => {
  return (
    <div css={progressBarPosition}>
      Home
      <ProgressBar currentProgress={70} maximumProgress={100} />
    </div>
  );
};

export default Home;

const progressBarPosition = css`
  width: 38rem;
`;
