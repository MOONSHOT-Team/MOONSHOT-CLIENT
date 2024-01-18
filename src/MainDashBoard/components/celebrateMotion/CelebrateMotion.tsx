import animationData from '@assets/lotties/congratulation.json';
import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import Spline from '@splinetool/react-spline';
import Lottie from 'lottie-react';

import DrawerModal from '../drawer/DrawerModal';

interface ICelebrateMotionProps {
  handleChangeState: (state: number) => void;
  currentObjId: number;
}

const CelebrateMotion = ({ handleChangeState, currentObjId }: ICelebrateMotionProps) => {
  const { modalRef, handleShowModal } = useModal();

  return (
    <section css={CelebrateMotionContainer}>
      <CustomLottie animationData={animationData} loop={false} />

      <StCelebrateMotionWrapper>
        <CustomSpline scene={'https://prod.spline.design/55BQyyYxSOmUQ1Mh/scene.splinecode'} />
        <StCelebrateTextBox>
          <StCelebrateTitle>문샷님 축하드립니다!</StCelebrateTitle>
          <StCelebrateDescription>
            모든 KR에 대한 목표를 달성했네요. 도전적인 목표를 이어가볼까요?
          </StCelebrateDescription>
        </StCelebrateTextBox>
        <StCelebrateBtnBox>
          <StFinishBtn type="button" onClick={() => handleChangeState(0)}>
            목표 완료하기
          </StFinishBtn>
          <StMoreBtn type="button" onClick={handleShowModal}>
            목표 이어가기
          </StMoreBtn>
        </StCelebrateBtnBox>
      </StCelebrateMotionWrapper>
      <Modal ref={modalRef}>
        <DrawerModal currentObjId={currentObjId} />
      </Modal>
    </section>
  );
};

export default CelebrateMotion;

const CustomSpline = styled(Spline)`
  display: flex;
  justify-content: center;
  width: 400px !important;
  height: 420px !important;

  & > canvas {
    z-index: -20;
    width: 400px !important;
    height: 420px !important;
  }
`;

const CustomLottie = styled(Lottie)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100vw;
  height: 100dvh;
`;

const CelebrateMotionContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StCelebrateMotionWrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
`;

const StCelebrateTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 1.6rem;
  text-align: center;
`;

const StCelebrateTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const StCelebrateDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StCelebrateBtnBox = styled.div`
  display: flex;
  gap: 1.2rem;
  margin: 4rem 0;
`;

const StCelebrateBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  height: 4rem;
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;

const StFinishBtn = styled(StCelebrateBtnStyle)`
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_500};
`;

const StMoreBtn = styled(StCelebrateBtnStyle)`
  color: ${({ theme }) => theme.colors.gray_650};
  background-color: ${({ theme }) => theme.colors.gray_100};
`;
