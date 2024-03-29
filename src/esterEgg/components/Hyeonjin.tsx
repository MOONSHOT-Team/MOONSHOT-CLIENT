import animationData from '@assets/lotties/congratulation.json';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ColorsTypes } from '@styles/theme';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

import { ImgPopUp } from '../../Onboarding/styles/animation';
import { sectionStyle } from '../../Onboarding/styles/common';
import hyeonjin from '../assets/hyeonjin.png';
import hyeonjin2 from '../assets/hyeonjin2.jpg';
import hyeonjin3 from '../assets/hyeonjin3.jpeg';
import hyeonjin4 from '../assets/hyeonjin4.jpeg';
import hyeonjin5 from '../assets/hyeonjin5.jpg';
import hyeonjin6 from '../assets/hyeonjin6.jpeg';
import hyeonjin7 from '../assets/hyeonjin7.jpg';

const Hyeonjin = () => {
  const [isCelebration, setIsCelebration] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCelebration(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section css={section}>
      <>
        {isCelebration && <StCustomLottie animationData={animationData} loop={true} />}
        <div css={textContainer}>
          <StSubTitle isCelebration={isCelebration} subTitleColor="sub_pink">
            🎉 24.01.18 🎉
          </StSubTitle>
          <StTitle
            isCelebration={isCelebration}
          >{`한국은 3면이 아니라 4면이 바다라고 하던데?\n동해, 서해, 남해, 박현진 사랑해`}</StTitle>
          <StDescription isCelebration={isCelebration}>🥳 현진이 생일축하해 🥳</StDescription>
        </div>
        <div css={imgContainer}>
          <StLateImgPopUp
            fromX={25}
            fromY={42.2}
            toX={25}
            toY={18.2}
            delay={4}
            src={hyeonjin7}
            alt="hyeonjin-hbd"
            width={400}
            height={500}
          />
          <StLateImgPopUp
            fromX={20}
            fromY={0}
            toX={20}
            toY={-15}
            delay={2}
            src={hyeonjin4}
            alt="hyeonjin-hbd"
            width={270}
            height={360}
          />
          <StLateImgPopUp
            fromX={5}
            fromY={40}
            toX={5}
            toY={15}
            delay={0}
            src={hyeonjin2}
            alt="hyeonjin-hbd"
            width={270}
            height={360}
          />
          <StLateImgPopUp
            fromY={70}
            toY={0}
            delay={6}
            src={hyeonjin}
            alt="hyeonjin-hbd"
            width={540}
            height={720}
          />
          <StLateImgPopUp
            fromX={-5}
            fromY={-10}
            toX={-5}
            toY={-20}
            delay={1}
            src={hyeonjin3}
            alt="hyeonjin-hbd"
            width={270}
            height={360}
          />
          <StLateImgPopUp
            fromX={-10}
            fromY={50}
            toX={-10}
            toY={10}
            delay={3}
            src={hyeonjin5}
            alt="hyeonjin-hbd"
            width={400}
            height={500}
          />
          <StLateImgPopUp
            fromX={-70}
            fromY={50}
            toX={-70}
            toY={30}
            delay={5}
            src={hyeonjin6}
            alt="hyeonjin-hbd"
            width={270}
            height={360}
          />
        </div>
      </>
    </section>
  );
};

export default Hyeonjin;

const section = css`
  gap: 20rem;
  height: 148rem;
  padding-top: 10rem;

  ${sectionStyle}
`;

const imgContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const textContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StSubTitle = styled.p<{ subTitleColor: keyof ColorsTypes; isCelebration: boolean }>`
  margin-bottom: 4rem;
  font-size: 3rem;
  font-weight: 400;
  line-height: 2.387rem;
  color: ${({ theme, subTitleColor }) => theme.colors[subTitleColor]};
  opacity: ${({ isCelebration }) => (isCelebration ? 1 : 0)};
  transition: opacity 5s ease;
`;

const StTitle = styled.h2<{ isCelebration: boolean }>`
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: 600;
  line-height: 5rem;
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  white-space: pre-line;
  opacity: ${({ isCelebration }) => (isCelebration ? 1 : 0)};
  transition: opacity 5s ease;
`;

const StDescription = styled.p<{ isCelebration: boolean }>`
  margin: 2rem 0;
  font-size: 4rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colors.gray_200};
  opacity: ${({ isCelebration }) => (isCelebration ? 1 : 0)};
  transition: opacity 5s ease;
`;

const StLateImgPopUp = styled(ImgPopUp)`
  z-index: 2;
  opacity: 0;
`;

const StCustomLottie = styled(Lottie)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100vw;
  height: 100dvh;
`;
