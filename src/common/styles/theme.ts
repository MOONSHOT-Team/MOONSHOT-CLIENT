

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
`;


// medium =500
// bold=700
// underlineSemibold=600
// Strikethrough_Medium =500

const fonts = {
   medium: FONT({ family: 'Arial', weight: 500, size: 1, lineHeight: 1.5 }),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;


export const theme = {
  colors,
  fonts,
};

export type ThemeType = typeof theme;