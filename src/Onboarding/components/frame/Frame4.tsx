import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgFrame4DashboardDark from '../../assets/frame/imgFrame4DashboardDark.png';
import imgFrame4SideSheetLeft from '../../assets/frame/imgFrame4SideSheetLeft.png';
import imgFrame4SideSheetRight from '../../assets/frame/imgFrame4SideSheetRight.png';
import webpFrame4DashboardDark from '../../assets/frame/webpFrame4DashboardDark.webp';
import webpFrame4SideSheetLeft from '../../assets/frame/webpFrame4SideSheetLeft.webp';
import webpFrame4SideSheetRight from '../../assets/frame/webpFrame4SideSheetRight.webp';
import { CONTENTS } from '../../constants/CONTENTS';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

interface Frame4Props {
  isInView: boolean;
  refCallback: (elem: HTMLSelectElement) => void;
}

const Frame4 = ({ isInView, refCallback }: Frame4Props) => {
  return (
    <section id="frame4" css={section} ref={refCallback}>
      <TextField
        subTitle={CONTENTS[3].subTitle!}
        subTitleColor={CONTENTS[3].subTitleColor!}
        title={CONTENTS[3].title}
        description={CONTENTS[3].description!}
      />
      {isInView && (
        <div css={imgContainer}>
          <picture css={zIndex}>
            <source srcSet={webpFrame4SideSheetLeft} type="image/webp" />
            <StLateImgPopUp
              fromX={31.7}
              fromY={52.2}
              toX={31.7}
              toY={28.2}
              delay={2}
              src={imgFrame4SideSheetLeft}
              alt="main-dashboard-img-1"
              width={420}
              height={479}
            />
          </picture>
          <picture>
            <source srcSet={webpFrame4DashboardDark} type="image/webp" />
            <StCenterImgPopUp
              fromY={20}
              toY={0}
              src={imgFrame4DashboardDark}
              alt="main-dashboard-img-2"
              width={800}
              height={450}
            />
          </picture>
          <picture>
            <source srcSet={webpFrame4SideSheetRight} type="image/webp" />
            <StLateImgPopUp
              fromX={-31.7}
              fromY={0}
              toX={-31.7}
              toY={-24}
              delay={1}
              src={imgFrame4SideSheetRight}
              alt="main-dashboard-img-3"
              width={420}
              height={323}
            />
          </picture>
        </div>
      )}
    </section>
  );
};

export default Frame4;

const section = css`
  gap: 27.5rem;
  height: 148rem;
  padding-top: 10rem;

  ${sectionStyle}
`;

const zIndex = css`
  z-index: 3;
`;

const imgContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const StCenterImgPopUp = styled(ImgPopUp)`
  border-radius: 8px;
`;

const StLateImgPopUp = styled(StCenterImgPopUp)`
  z-index: 2;
  opacity: 0;
`;
