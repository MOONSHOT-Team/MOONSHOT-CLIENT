import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import imgFrame1Background from '../../assets/imgFrame1Background.png';
// import imgFrame1MovingBackground from '../../assets/imgFrame1MovingBackground.png';
import imgFrame1ObjectiveList from '../../assets/imgFrame1ObjectiveList.png';
import imgFrame1Sidesheet from '../../assets/imgFrame1Sidesheet.png';
import imgFrame4MainDashboardDark from '../../assets/imgFrame4MainDashboardDark.png';
import { TEXT_ROLLING } from '../../constants/TEXT_ROLLING';
import { ImgPopUp } from '../../styles/animation';
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
      <RollingTextBox>
        <p css={textRolling}>{TEXT_ROLLING[textIdx]}</p>
      </RollingTextBox>
      <MainText>{`그토록 찾아 헤매던\n일상 생산성의 끝`}</MainText>
      <CtaLink to="/dashboard">서비스 시작하기</CtaLink>
      <div css={imgContainer}>
        <div css={fixedBackground} />
        <LateImgPopUp
          fromX={17.7}
          fromY={0}
          toX={17.7}
          toY={-15.8}
          delay={1}
          src={imgFrame1ObjectiveList}
          alt="objective-img"
          width={262}
          height={235}
        />
        <ImgPopUp
          fromY={20}
          toY={0}
          src={imgFrame4MainDashboardDark}
          alt="dashboard-img"
          width={996}
          height={560}
        />
        <LateImgPopUp
          fromX={-18.7}
          fromY={39}
          toX={-18.7}
          toY={19}
          delay={2}
          src={imgFrame1Sidesheet}
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
  height: 119.6rem;
  padding-top: 6.4rem;

  ${sectionStyle}
`;

const liftUp = keyframes`
  0% {
    transform: translateY(3rem);
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
    transform: translateY(-3rem);
    opacity: 0;
  }
`;

const textRolling = css`
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

const RollingTextBox = styled.div`
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
  border: 1px solid red;
  border-radius: 24px;
`;

const MainText = styled.h1`
  margin-bottom: 4rem;
  font-size: 5.2rem;
  font-weight: 700;
  line-height: 6.8rem;
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  white-space: pre-line;
`;

const CtaLink = styled(Link)`
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
`;

const LateImgPopUp = styled(ImgPopUp)`
  opacity: 0;
`;
