import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgFrame3GradientBackground from '../../assets/imgFrame3GradientBackground.png';
import imgFrame3Question1 from '../../assets/imgFrame3Question1.png';
import imgFrame3Question2 from '../../assets/imgFrame3Question2.png';
import imgFrame3Question3 from '../../assets/imgFrame3Question3.png';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

const Frame3 = () => {
  return (
    <section css={section}>
      <TextField
        subTitle="목표 설정"
        subTitleColor="sub_pink"
        title={`목표와 핵심 지표들을\n더욱 쉽고, 바르고, 의미있게`}
        description="고민의 시간들이 모여 도전적인 목표를 이룰 수 있도록, 추적을 통해 성장으로 이어지는 경험을 문샷과 함께하세요"
      />
      <div css={imgContainer}>
        <LateImgPopUp
          from={26}
          to={6}
          delay={1}
          src={imgFrame3Question1}
          alt="question-img-1"
          width={464}
          height={520}
        />
        <ImgPopUp
          from={20}
          to={0}
          src={imgFrame3Question2}
          alt="question-img-2"
          width={464}
          height={520}
        />
        <LateImgPopUp
          from={26}
          to={6}
          delay={2}
          src={imgFrame3Question3}
          alt="question-img-3"
          width={464}
          height={520}
        />
      </div>
      <img css={background} src={imgFrame3GradientBackground} alt="123" height={377} />
    </section>
  );
};

export default Frame3;

const section = css`
  position: relative;
  height: 106.5rem;

  ${sectionStyle};
`;

const imgContainer = css`
  display: flex;
  gap: 7.2rem;
  align-items: center;
  justify-content: center;
  width: 100vw;
  overflow: hidden;
`;

const background = css`
  position: absolute;
  bottom: 0;
  z-index: 20;
  width: 100vw;
  min-height: 37.7rem;
`;

const LateImgPopUp = styled(ImgPopUp)`
  opacity: 0;
  transform: translateY(6rem);
`;
