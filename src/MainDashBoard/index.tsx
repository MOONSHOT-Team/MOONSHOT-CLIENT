import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';

const MainDashBoard = () => {
  return (
    <div css={progressBarPosition}>
      <ProgressBar
        currentProgress={50}
        maximumProgress={100}
        progressBarColor={'#444444'}
        progressValueColor={'#F4B5FA'}
        textColor={'#F4B5FA'}
        isCurrentProgress={false}
      />
    </div>
  );
};

export default MainDashBoard;

const progressBarPosition = css`
  width: 38rem;
`;
