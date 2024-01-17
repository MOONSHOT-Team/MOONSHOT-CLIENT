import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type popUpType = {
  from: number;
  to: number;
  delay?: number;
};

const popUp = (from: number, to: number) => keyframes`
from {
  transform: translateY(${from}rem);
  opacity: 0;
}

to {
  transform: translateY(${to}rem);
  opacity: 1;
}
`;

export const ImgPopUp = styled.img<popUpType>`
  animation: ${({ from, to }) => popUp(from, to)} 1s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => `${delay}s`};
`;
