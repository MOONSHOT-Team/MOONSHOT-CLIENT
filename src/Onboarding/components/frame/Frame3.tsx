import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgFrame3GradientBackground from '../../assets/frame/imgFrame3GradientBackground.png';
import imgFrame3Question1 from '../../assets/frame/imgFrame3Question1.png';
import imgFrame3Question2 from '../../assets/frame/imgFrame3Question2.png';
import imgFrame3Question3 from '../../assets/frame/imgFrame3Question3.png';
import webpFrame3GradientBackground from '../../assets/frame/webpFrame3GradientBackground.webp';
import webpFrame3Question1 from '../../assets/frame/webpFrame3Question1.webp';
import webpFrame3Question2 from '../../assets/frame/webpFrame3Question2.webp';
import webpFrame3Question3 from '../../assets/frame/webpFrame3Question3.webp';
import { CONTENTS } from '../../constants/CONTENTS';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import isWebPSupported from '../../utils/isWebPSupported';
import TextField from './TextField';

interface Frame3Props {
  isInView: boolean;
  refCallback: (elem: HTMLSelectElement) => void;
}

const Frame3 = ({ isInView, refCallback }: Frame3Props) => {
  return (
    <section id="frame3" css={section} ref={refCallback}>
      <TextField
        subTitle={CONTENTS[2].subTitle!}
        subTitleColor={CONTENTS[2].subTitleColor!}
        title={CONTENTS[2].title}
        description={CONTENTS[2].description!}
      />
      {isInView && (
        <div css={imgContainer}>
          <picture>
            <source srcSet={webpFrame3Question1} type="image/webp" />
            <StLateImgPopUp
              fromY={26}
              toY={6}
              delay={1}
              src={imgFrame3Question1}
              alt="question-img-1"
              width={464}
              height={520}
            />
          </picture>
          <picture>
            <source srcSet={webpFrame3Question2} type="image/webp" />
            <ImgPopUp
              fromY={20}
              toY={0}
              src={imgFrame3Question2}
              alt="question-img-2"
              width={464}
              height={520}
            />
          </picture>
          <picture>
            <source srcSet={webpFrame3Question3} type="image/webp" />
            <StLateImgPopUp
              fromY={26}
              toY={6}
              delay={2}
              src={imgFrame3Question3}
              alt="question-img-3"
              width={464}
              height={520}
            />
          </picture>
        </div>
      )}
      <img
        css={background}
        src={isWebPSupported() ? webpFrame3GradientBackground : imgFrame3GradientBackground}
        alt="gradient-background"
        height={377}
        loading="lazy"
      />
    </section>
  );
};

export default Frame3;

const section = css`
  position: relative;
  gap: 10rem;
  height: 106.5rem;
  padding-top: 10rem;

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

const StLateImgPopUp = styled(ImgPopUp)`
  opacity: 0;
`;
