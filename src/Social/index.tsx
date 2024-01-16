import { css } from '@emotion/react';
import { useState } from 'react';

import SocialDrawer from './components/socialDrawer/SocialDrawer';
import SocialOKRTree from './components/socialOkrTree/SocialOKRTree';
import { MOCK_SOCIAL_DATA } from './constants/MOCK_SOCIAL_DATA';

const Social = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleCurrentIdx = (idx: number) => {
    setCurrentIdx(idx);
  };
  return (
    <section css={mainSocialStyle}>
      <SocialDrawer onHandleCurrentIdx={handleCurrentIdx} />
      <SocialOKRTree okrTreeData={MOCK_SOCIAL_DATA[currentIdx]?.okrTreeData} />
    </section>
  );
};

export default Social;

const mainSocialStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
