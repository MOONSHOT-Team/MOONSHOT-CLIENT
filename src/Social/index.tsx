import { css } from '@emotion/react';
import styled from '@emotion/styled';
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
      <StUserName>{MOCK_SOCIAL_DATA[currentIdx]?.userName}님의 OKR</StUserName>
    </section>
  );
};

export default Social;

const mainSocialStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;

const StUserName = styled.div`
  position: fixed;
  top: 10rem;
  left: 28.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;
