import { css } from '@emotion/react';

import imgFrame2TreeGraph from '../../assets/frame/imgFrame2TreeGraph.png';
import webpFrame2TreeGraph from '../../assets/frame/webpFrame2TreeGraph.webp';
import useScrollDetect from '../../hooks/useScrollDetect';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

const Frame2 = () => {
  const { active, element } = useScrollDetect();

  return (
    <section css={section} ref={element}>
      <TextField
        subTitle="OKR tree"
        subTitleColor="main_purple"
        title={`흩어져 있는 할 일을\n하나의 북극성 아래`}
        description="파편화된 할 일들을 단 3개의 우선순위로 정렬시켜 핵심 지표를 달성하는데 집중하세요"
      />
      {active && (
        <picture>
          <source srcSet={webpFrame2TreeGraph} type="image/webp" />
          <ImgPopUp
            fromY={20}
            toY={0}
            src={imgFrame2TreeGraph}
            alt="tree-img"
            width={986}
            height={657}
          />
        </picture>
      )}
    </section>
  );
};

export default Frame2;

const section = css`
  gap: 12rem;
  height: 110.4rem;
  padding-top: 8rem;

  ${sectionStyle};
`;
