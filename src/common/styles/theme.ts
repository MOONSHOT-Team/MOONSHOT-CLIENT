interface IColors {
  primary: string;
  // 예시
}

interface IFont {
  family: string;
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
  textDecorationLine?: string;
}

const FONT = ({
  family,
  weight,
  size,
  lineHeight,
  letterSpacing,
  textDecorationLine,
}: IFont): string => `
  font-family: ${family};
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight};
  ${letterSpacing ? `letter-spacing: ${letterSpacing}px;` : ''}
  ${textDecorationLine ? `text-decoration-line: ${textDecorationLine};` : ''}
`;//예시

interface IFonts {
  medium: string;
  // 예시
}

const colors: IColors = {
  primary: '#0055aa',
  // 예시
};

const fonts: IFonts = {
  medium: FONT({ family: 'Arial', weight: 500, size: 1, lineHeight: 1.5 }),
  // 추가 폰트 스타일 값...
};

interface ITheme {
  colors: IColors;
  fonts: IFonts;
}

export const theme: ITheme = {
  colors,
  fonts,
};


