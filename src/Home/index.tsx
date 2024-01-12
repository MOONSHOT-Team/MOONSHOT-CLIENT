import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';

const Home = () => {
  return (
    <div css={progressBarPosition}>
      Home
      <ProgressBar
        currentProgress={70}
        maximumProgress={100}
        progressBarColor={'#5B5B5B'}
        progressValueColor={'#C2C2C2'}
        textColor={'#A7A7A7'}
        isCurrentProgress={true}
      />
    </div>
  );
};

export default Home;

const progressBarPosition = css`
  width: 38rem;
`;
