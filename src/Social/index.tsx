import Loading from '@components/Loading';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getSocialInfo } from './apis/getSocialFetcher';
import SocialDrawer from './components/socialDrawer/SocialDrawer';
import SocialOKRTree from './components/socialOkrTree/SocialOKRTree';

const Social = () => {
  const { data: socialData, isLoading } = useSWR('v1/objective/social', getSocialInfo);

  // console.log(socialData);

  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleCurrentIdx = (idx: number) => {
    setCurrentIdx(idx);
  };

  useEffect(() => {
    if (!localStorage.getItem('ACCESS_TOKEN')) navigate('sign-in');
  }, []);

  if (isLoading) return <Loading />;

  return (
    <section css={mainSocialStyle}>
      <SocialDrawer socialData={socialData} onHandleCurrentIdx={handleCurrentIdx} />
      <SocialOKRTree okrTreeData={socialData[currentIdx]?.okrTreeData} />
      <StUserName>{socialData[currentIdx]?.userName}님의 OKR</StUserName>
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
