import { css } from '@emotion/react';

import imgFrame2TreeGraph from '../../assets/frame/imgFrame2TreeGraph.png';
import webpFrame2TreeGraph from '../../assets/frame/webpFrame2TreeGraph.webp';
import { CONTENTS } from '../../constants/CONTENTS';
import useScrollDetect from '../../hooks/useScrollDetect';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

const Frame2 = () => {
  const { active, element } = useScrollDetect();

  return (
    <section css={section} ref={element}>
      <TextField
        subTitle={CONTENTS[1].subTitle!}
        subTitleColor={CONTENTS[1].subTitleColor!}
        title={CONTENTS[1].title}
        description={CONTENTS[1].description!}
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
