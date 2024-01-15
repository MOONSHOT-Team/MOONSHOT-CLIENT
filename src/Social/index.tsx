import { css } from '@emotion/react';

import SocialDrawer from './components/socialDrawer/SocialDrawer';
import SocialOKRTree from './components/socialOkrTree/SocialOKRTree';

const Social = () => {
  return (
    <section css={mainSocialStyle}>
      <SocialDrawer />
      <SocialOKRTree />
    </section>
  );
};

export default Social;

const mainSocialStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
