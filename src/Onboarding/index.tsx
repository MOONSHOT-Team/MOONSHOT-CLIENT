import { css } from '@emotion/react';

import Frame2 from './components/frame/Frame2';
import Frame3 from './components/frame/Frame3';
import Frame4 from './components/frame/Frame4';
import Frame5 from './components/frame/Frame5';
import Frame6 from './components/frame/Frame6';

const Onboarding = () => {
  return (
    <div css={frameContainer}>
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
};

export default Onboarding;

const frameContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
