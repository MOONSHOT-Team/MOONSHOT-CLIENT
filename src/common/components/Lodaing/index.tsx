import animateData from '@components/Lodaing/assets/lottie/loading.json';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <StLoadingContainer>
      <div css={LoadingBox}>
        <StCustomLoadingLottie animationData={animateData} loop={true} />
        <StLoadingTxt>로딩 중입니다</StLoadingTxt>
      </div>
    </StLoadingContainer>
  );
};

export default Loading;

const StLoadingContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

const LoadingBox = css`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  text-align: center;
`;

const StLoadingTxt = styled.p`
  /* position: absolute;
  right: 50%;
  bottom: 15rem; */

  /* transform: translate(50%, 0); */

  text-align: center;

  ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StCustomLoadingLottie = styled(Lottie)`
  position: relative;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
`;
