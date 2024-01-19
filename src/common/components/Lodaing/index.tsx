import animateData from '@components/Lodaing/assets/lottie/loading.json';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <StLoadingContainer>
      {/* <StLoadingGif src={loading} alt="loading-img" /> */}
      <StCustomLoadingLottie animationData={animateData} loop={true}>
        <StLoadingTxt>로딩 중입니다</StLoadingTxt>
      </StCustomLoadingLottie>
    </StLoadingContainer>
  );
};

export default Loading;

const StLoadingContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

const StLoadingTxt = styled.p`
  position: absolute;
  top: 25rem;
  right: 50%;
  transform: translate(50%, 0);

  ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StCustomLoadingLottie = styled(Lottie)`
  position: relative;
  width: 30rem;
  height: 30rem;
  margin: 0 auto;
`;
