import { css } from '@emotion/react';

import Frame2 from './components/frame/Frame2';
import Frame3 from './components/frame/Frame3';

const Onboarding = () => {
  return (
    <div css={frameContainer}>
      <Frame2 />
      <Frame3 />
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
