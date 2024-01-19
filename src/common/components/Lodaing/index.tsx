import animateData from '@components/Lodaing/assets/lottie/loading.json';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <StLoadingContainer>
      {/* <StLoadingGif src={loading} alt="loading-img" /> */}
      <StCustomLoadingLottie animationData={animateData} loop={true} />
      <StLoadingTxt>로딩 중입니다</StLoadingTxt>
    </StLoadingContainer>
  );
};

export default Loading;

const StLoadingContainer = styled.section`
  margin: 50vh auto 0;
  text-align: center;
  transform: translateY(-50%);
`;

// const StLoadingGif = styled.img`
//   position: relative;
//   width: 63.8rem;
//   height: 63.8rem;
// `;

const StLoadingTxt = styled.p`
  position: absolute;
  right: 50%;
  bottom: 0;
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
