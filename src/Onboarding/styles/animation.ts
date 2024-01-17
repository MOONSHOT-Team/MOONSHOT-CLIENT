import { css, keyframes } from '@emotion/react';

const popUp = keyframes`
from {
  transform: translateY(20rem);
}

to {
  transform: translateY(0);
}
`;

export const imgPopUp = css`
  animation: ${popUp} 1s ease-out;
`;
