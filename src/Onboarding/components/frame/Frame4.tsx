import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgFrame4DashboardDark from '../../assets/frame/imgFrame4DashboardDark.png';
import imgFrame4SideSheetLeft from '../../assets/frame/imgFrame4SideSheetLeft.png';
import imgFrame4SideSheetRight from '../../assets/frame/imgFrame4SideSheetRight.png';
import useScrollDetect from '../../hooks/useScrollDetect';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

const Frame4 = () => {
  const { active, element } = useScrollDetect();

  return (
    <section css={section} ref={element}>
      <TextField
        subTitle="KR 체크인"
        subTitleColor="sub_mint"
        title={`달에 쏘아올릴 도전적인 목표와\n실패가 용인되는 유연한 여정`}
        description="북극성을 따라 성취를 기록하고, 환경에 따라 수정하며 끊임없이 나아가세요"
      />
      {active && (
        <div css={imgContainer}>
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
          <StCenterImgPopUp
            fromY={20}
            toY={0}
            src={imgFrame4DashboardDark}
            alt="main-dashboard-img-2"
            width={800}
            height={450}
          />
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
