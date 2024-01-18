import { css } from '@emotion/react';

import Hyeonjin from '../esterEgg/components/Hyeonjin';
import Frame1 from './components/frame/Frame1';
import Frame2 from './components/frame/Frame2';
import Frame3 from './components/frame/Frame3';
import Frame4 from './components/frame/Frame4';
import Frame5 from './components/frame/Frame5';
import Frame6 from './components/frame/Frame6';

const Onboarding = () => {
  return (
    <div css={frameContainer}>
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Hyeonjin />
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
