import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type popUpType = {
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
  delay?: number;
};

const popUp = (fromX: number = 0, fromY: number = 0, toX: number = 0, toY: number = 0) => keyframes`
from {
  transform: translate(${fromX}rem, ${fromY}rem);
  opacity: 0;
}

to {
  transform: translate(${toX}rem, ${toY}rem);
  opacity: 1;
}
`;

export const ImgPopUp = styled.img<popUpType>`
  border-radius: 12px;
  animation: ${({ fromX, fromY, toX, toY }) => popUp(fromX, fromY, toX, toY)} 1s ease-out forwards;
  animation-delay: ${({ delay = 0 }) => `${delay}s`};
`;
