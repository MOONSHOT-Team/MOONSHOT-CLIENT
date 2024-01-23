import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import imgFrame1Background from '../../assets/frame/imgFrame1Background.png';
import imgFrame1MainDashboard from '../../assets/frame/imgFrame1MainDashboard.png';
import imgFrame1MovingBackground from '../../assets/frame/imgFrame1MovingBackground.png';
import imgFrame1ObjectiveItem from '../../assets/frame/imgFrame1ObjectiveItem.png';
import imgFrame1SideSheetRight from '../../assets/frame/imgFrame1SideSheetRight.png';
import { TEXT_ROLLING } from '../../constants/TEXT_ROLLING';
import { ImgPopUp, popUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';

const Frame1 = () => {
  const [textIdx, setTextIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIdx((prev) => (TEXT_ROLLING.length - 1 === textIdx ? 0 : (prev += 1)));
    }, 3000);

    return () => clearInterval(timer);
  });

  return (
    <section css={section}>
      <div css={imgSlide} />
      <StRollingTextBox>
        {TEXT_ROLLING.filter((_, idx) => idx === textIdx).map((text) => (
          <p css={textRolling} key={text}>
            {text}
          </p>
        ))}
        {/* <p css={textRolling}>{TEXT_ROLLING[textIdx]}</p> */}
      </StRollingTextBox>
      <StMainText>{`그토록 찾아 헤매던\n일상 생산성의 끝`}</StMainText>
      <StCtaLink to="https://tally.so/r/n0Ol0N" target="_blank">
        서비스 시작하기
      </StCtaLink>
      <div css={imgContainer}>
        <div css={fixedBackground} />
        <StLeftLateImgPopUp
          fromX={17.7}
          fromY={0}
          toX={17.7}
          toY={-15.8}
          delay={1}
          src={imgFrame1ObjectiveItem}
          alt="objective-img"
          width={262}
          height={235}
        />
        <StDashboardContainer>
          <StImgDashboardPopUp
            fromY={20}
            toY={0}
            src={imgFrame1MainDashboard}
            alt="dashboard-img"
            width={996}
            height={560}
          />
        </StDashboardContainer>
        <StRightLateImgPopUp
          fromX={-18.7}
          fromY={39}
          toX={-18.7}
          toY={19}
          delay={1.5}
          src={imgFrame1SideSheetRight}
          alt="sidesheet-img"
          width={272}
          height={570}
        />
      </div>
    </section>
  );
};

export default Frame1;

const section = css`
  position: relative;
  height: 119.6rem;
  padding-top: 6.4rem;

  ${sectionStyle}
`;

const slideIn = keyframes`
  from {
    background-position: top;
  }
  to {
    background-position: 100000vw 0px;
  }
`;

const imgSlide = css`
  position: absolute;
  top: 27rem;
  width: 100vw;
  height: 92.5rem;
  background-image: url(${imgFrame1MovingBackground});

  /* stylelint-disable property-no-vendor-prefix */
  background-size: 194rem 92.5rem;
  -webkit-animation: ${slideIn} 40000s ease;
  animation: ${slideIn} 40000s ease;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;

const liftUp = keyframes`
  0% {
    transform: translateY(4rem);
    opacity: 0;
  }

  15% {
    transform: translateY(0rem);
    opacity: 1;
  }

  85% {
    transform: translateY(0rem);
    opacity: 1;
  }

  100% {
    transform: translateY(-4rem);
    opacity: 0;
  }
`;

const textRolling = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: ${liftUp} 3s ease-out infinite;
`;

const imgContainer = css`
  position: relative;
  display: flex;
`;

const fixedBackground = css`
  position: absolute;
  top: -32rem;
  left: 50%;
  z-index: -1;
  width: 100vw;
  height: 120rem;
  background-image: url(${imgFrame1Background});
  background-size: 100vw 120rem;
  transform: translateX(-50%);
`;

const StRollingTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32.2rem;
  height: 3.8rem;
  margin-bottom: 3.8rem;
  overflow: hidden;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.gray_150};
  background-image: linear-gradient(
      ${({ theme }) => theme.colors.background},
      ${({ theme }) => theme.colors.background}
    ),
    linear-gradient(87.29deg, #444 8.86%, #7165ca 55.07%, #444 91.76%);
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 1px solid transparent;
  border-radius: 24px;
`;

const StMainText = styled.h1`
  margin-bottom: 4rem;
  font-size: 5.2rem;
  font-weight: 700;
  line-height: 6.8rem;
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  white-space: pre-line;
`;

const StCtaLink = styled(Link)`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19.4rem;
  height: 5.2rem;
  margin-bottom: 6.6rem;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border: 1px solid #655e94;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #8d7efd29;
    border: 1px solid ${({ theme }) => theme.colors.main_purple};
  }
`;

const animatedGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StDashboardContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 99.6rem;
  height: 56rem;
  background: ${({ theme }) => theme.colors.background};
  border-width: 4px;
  border-radius: 12px;
  animation: ${popUp(0, 20, 0, 0)} 1s ease-out;

  &::after {
    position: absolute;
    top: -0.4rem;
    left: -0.4rem;
    z-index: -1;
    width: 100.4rem;
    height: 56.8rem;
    content: '';
    background: linear-gradient(
      72.96deg,
      rgb(68 68 68 / 80%) 3.5%,
      rgb(141 126 253 / 80%) 49.05%,
      rgb(68 68 68 / 80%) 97.5%
    );
    background-size: 300% 300%;
    border-radius: 12px;
    animation: ${animatedGradient} 3s ease alternate infinite;
  }
`;

const StImgDashboardPopUp = styled(ImgPopUp)`
  border-radius: 12px;
  animation: ${popUp(0, 20, 0, 0)} 0.1s ease-out;
`;

const StLeftLateImgPopUp = styled(ImgPopUp)`
  opacity: 0;
`;

const StRightLateImgPopUp = styled(ImgPopUp)`
  z-index: 3;
  opacity: 0;
`;
