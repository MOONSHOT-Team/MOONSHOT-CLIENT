import { Theme } from '@emotion/react';

const colors = {
  background: '#1E1E20',
  gray000: '#FFFFFF',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray150: '#222222',
  gray200: '#DCDCDC',
  gray250: '#C2C2C2',
  gray300: '#A7A7A7',
  gray350: '#8E8E8E',
  gray400: '#717171',
  gray450: '#5B5B5B',
  gray500: '#444444',
  gray550: '#2F2F2F',
  gray600: '#242424',
  gray650: '#222222',
  mainPurple: '#8D7EFD',
  subYellow: '#FFD749',
  subGreen: '#63D7C6',
  subRed: '#D96D6D',
  subBlue: '#6CA4F6',
  subYellowgreen: '#86DC68',
  transparentPurple: '#8D7EFD29',
  transparentWhite: '#FFFFFF1A',
  transparentPurple10: '#8D7EFD1A',
  transparentRed10: '#D96D6D1A',
  transparentGreen10: '#63D7C61A',
  transparentBlue10: '#6CA4F61A',
  transparentYellow10: '#FFD7491A',
  transparentYellowgreen10: '#86DC681A',
};

type Font = {
  family: string;
  weight: number;
  size: number;
  fontStyle: string;
  lineHeight: number;
  textDecorationLine?: string;
};
const FONT = ({ weight, size, fontStyle, lineHeight }: Font): string => `
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-weight: ${weight};
  font-size: ${size}rem;
  font-style: ${fontStyle};
  line-height: ${lineHeight}rem;
`;

const fonts = {
  title_20_semibold: FONT({
    family: 'Pretendard Variable',
    size: 2,
    fontStyle: 'normal',
    weight: 600,
    lineHeight: 3.2,
  }),
  title_16_semibold: FONT({
    family: 'Pretendard Variable',
    size: 1.6,
    fontStyle: 'normal',
    weight: 600,
    lineHeight: 2.8,
  }),
  title_11_bold: FONT({
    family: 'Pretendard Variable',
    size: 1.1,
    fontStyle: 'normal',
    weight: 670,
    lineHeight: 1.8,
  }),
  body_14_semibold: FONT({
    family: 'Pretendard Variable',
    size: 1.4,
    fontStyle: 'normal',
    weight: 600,
    lineHeight: 3.2,
  }),
  body_14_medium: FONT({
    family: 'Pretendard Variable',
    size: 1.4,
    fontStyle: 'normal',
    weight: 500,
    lineHeight: 1.4,
  }),
  body_13_medium: FONT({
    family: 'Pretendard Variable',
    size: 1.3,
    fontStyle: 'normal',
    weight: 500,
    lineHeight: 2,
  }),
  body_12_medium: FONT({
    family: 'Pretendard Variable',
    size: 1.2,
    fontStyle: 'normal',
    weight: 500,
    lineHeight: 1.8,
  }),
  body_12_regular: FONT({
    family: 'Pretendard Variable',
    size: 1.2,
    fontStyle: 'normal',
    weight: 400,
    lineHeight: 1.8,
  }),
  body_10_regular: FONT({
    family: 'Pretendard Variable',
    size: 1,
    fontStyle: 'normal',
    weight: 400,
    lineHeight: 1.5,
  }),
  btn_14_semibold: FONT({
    family: 'Pretendard Variable',
    size: 1.4,
    fontStyle: 'normal',
    weight: 600,
    lineHeight: 1.4,
  }),
  btn_14_medium: FONT({
    family: 'Pretendard Variable',
    size: 1.4,
    fontStyle: 'normal',
    weight: 500,
    lineHeight: 1.4,
  }),
  btn_11_semibold: FONT({
    family: 'Pretendard Variable',
    size: 1.1,
    fontStyle: 'normal',
    weight: 500,
    lineHeight: 1.1,
  }),
  caption_10_medium: FONT({
    family: 'Pretendard Variable',
    size: 1,
    fontStyle: 'normal',
    weight: 500,
    lineHeight: 1.5,
  }),
  caption_9_regular: FONT({
    family: 'Pretendard Variable',
    size: 0.9,
    fontStyle: 'normal',
    weight: 400,
    lineHeight: 1.5,
  }),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: Theme = {
  colors,
  fonts,
};
