import { css, keyframes } from '@emotion/react';

import imgFrame6Background from '../../assets/imgFrame6Background.png';

const Frame6 = () => {
  return (
    <section css={section}>
      <div css={imgSlide} />
    </section>
  );
};

export default Frame6;

const slideIn = keyframes`
  from {
    background-position: top;
  }
  to {
    background-position: 10000vw 0px;
  }
`;

const section = css`
  width: 100vw;
  height: 36.1rem;
  padding: 11.8rem 0;
`;

const imgSlide = css`
  width: 100vw;
  height: 13.6rem;
  background-image: url(${imgFrame6Background});

  /* stylelint-disable property-no-vendor-prefix */
  background-size: 136.6rem 13.6rem;
  -webkit-animation: ${slideIn} 2500s ease;
  animation: ${slideIn} 2500s ease;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;
