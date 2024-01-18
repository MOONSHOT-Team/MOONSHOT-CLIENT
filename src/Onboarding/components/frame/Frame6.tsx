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
    background-size: 300rem; 
  }
  to {
    background-position: -100px 0px;
    background-size: 275rem;
  }
`;

const section = css`
  width: 100rem;
  height: 36.1rem;
  padding: 11.8rem 0;
`;

const imgSlide = css`
  width: 100%;
  height: 13.6rem;
  background-image: url(${imgFrame6Background});

  /* stylelint-disable property-no-vendor-prefix */
  background-size: contain;
  -webkit-animation: ${slideIn} 100s;
  animation: ${slideIn} 100s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;
