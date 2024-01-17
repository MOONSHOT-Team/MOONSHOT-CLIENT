import { css } from '@emotion/react';
import styled from '@emotion/styled';

import imgFrame5List1 from '../../assets/imgFrame5List1.png';
import imgFrame5List1Open from '../../assets/imgFrame5List1Open.png';
import imgFrame5List2 from '../../assets/imgFrame5List2.png';
import imgFrame5List3 from '../../assets/imgFrame5List3.png';
import imgFrame5List4 from '../../assets/imgFrame5List4.png';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

const Frame5 = () => {
  return (
    <section css={section}>
      <TextField
        subTitle="History"
        subTitleColor="sub_blue"
        title="나의 모든 우주 여정을 여기에"
        description="꾸준함으로 쌓인 발자취를 확인하며 앞으로의 미래를 향해 다시 나아가세요"
      />
      <div css={imgContainer}>
        <ImgPopUp src={imgFrame5List1} alt="main-dashboard-img-1" width={1005} height={57} />
        <LateImgPopUp
          delay={2.2}
          src={imgFrame5List1Open}
          alt="main-dashboard-img-2"
          width={1005}
          height={240}
        />
        <ImgPopUp
          fromY={0}
          toY={19}
          delay={2}
          src={imgFrame5List2}
          alt="main-dashboard-img-3"
          width={1005}
          height={57}
        />
        <ImgPopUp
          fromY={0}
          toY={19}
          delay={2}
          src={imgFrame5List3}
          alt="main-dashboard-img-3"
          width={1005}
          height={57}
        />
        <ImgPopUp
          fromY={0}
          toY={19}
          delay={2}
          src={imgFrame5List4}
          alt="main-dashboard-img-3"
          width={1005}
          height={57}
        />
      </div>
    </section>
  );
};
// 168

export default Frame5;

const section = css`
  gap: 10rem;
  height: 96.1rem;
  padding-top: 10rem;

  ${sectionStyle}
`;

const imgContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const LateImgPopUp = styled(ImgPopUp)`
  position: absolute;
  top: 0;
  opacity: 0;
`;
