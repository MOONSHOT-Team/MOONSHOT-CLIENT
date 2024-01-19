import animateData from '@components/Loading/assets/lottie/loading.json';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';

const Loading = ({ isDrawer = false }: { isDrawer?: boolean }) => {
  return (
    <StLoadingContainer $isDrawer={isDrawer}>
      <StCustomLoadingLottie animationData={animateData} loop={true}>
        <StLoadingTxt>로딩 중입니다</StLoadingTxt>
      </StCustomLoadingLottie>
    </StLoadingContainer>
  );
};

export default Loading;

const StLoadingContainer = styled.section<{ $isDrawer: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $isDrawer }) => ($isDrawer ? 'calc(100vw - 23.2rem)' : '100vw')};
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
