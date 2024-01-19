import { css, keyframes } from '@emotion/react';

import imgFrame6MovingBackground from '../../assets/frame/imgFrame6MovingBackground.png';

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
  padding: 17rem 0 10.7rem;
`;

const imgSlide = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 8.4rem;
  background-image: url(${imgFrame6MovingBackground});

  /* stylelint-disable property-no-vendor-prefix */
  background-size: 118.8rem 8.4rem;
  -webkit-animation: ${slideIn} 5000s ease;
  animation: ${slideIn} 5000s ease;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;
