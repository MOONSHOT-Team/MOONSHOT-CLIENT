import animateData from '@components/Loading/assets/lottie/loading.json';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';

const Loading = ({ isDrawer = false }: { isDrawer?: boolean }) => {
  return (
    <StLoadingContainer $isDrawer={isDrawer}>
      <div css={LoadingBox}>
        <StCustomLoadingLottie animationData={animateData} loop={true} />
        <StLoadingTxt>로딩 중입니다</StLoadingTxt>
      </div>
    </StLoadingContainer>
  );
};

export default Loading;

const StLoadingContainer = styled.section<{ $isDrawer: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $isDrawer }) => ($isDrawer ? 'calc(100vw - 23.2rem)' : '100vw')};
  height: 100%;
  margin-top: 50vh;
  margin-left: auto;
  transform: translateY(-50%);
`;

const LoadingBox = css`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  text-align: center;
`;

const StLoadingTxt = styled.p`
  ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StCustomLoadingLottie = styled(Lottie)`
  position: relative;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
`;
