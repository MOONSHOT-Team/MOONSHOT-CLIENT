import { Theme } from "@emotion/react";

const colors = {
  primary: '#0055aa',
};

type Font = {
  family: string;
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
  textDecorationLine?: string;
};
const FONT = ({
  family,
  weight,
  size,
  lineHeight,
  letterSpacing,
  textDecorationLine,
}: Font): string => `
  font-family: ${family};
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight};
  ${letterSpacing ? `letter-spacing: ${letterSpacing}px;` : ''}
  ${textDecorationLine ? `text-decoration-line: ${textDecorationLine};` : ''}
`; //이 부분은 합세 때 코드 가져온건데 디자인시스템 나오는거 보고 수정하겠습니다!!


const fonts = {
   medium: FONT({ family: 'Arial', weight: 500, size: 1, lineHeight: 1.5 }),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;


export const theme:Theme = {
  colors,
  fonts,
};

