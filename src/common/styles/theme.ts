import { Theme } from '@emotion/react';

const colors = {
  background: '#1E1E20',
  gray_000: '#FFFFFF',
  gray_50: '#FAFAFA',
  gray_100: '#F5F5F5',
  gray_150: '#EBEBEB',
  gray_200: '#DCDCDC',
  gray_250: '#C2C2C2',
  gray_300: '#A7A7A7',
  gray_350: '#8E8E8E',
  gray_400: '#717171',
  gray_450: '#5B5B5B',
  gray_500: '#444444',
  gray_550: '#2F2F2F',
  gray_600: '#242424',
  gray_650: '#222222',
  gray_700: '#131313',
  main_purple: '#8D7EFD',
  main_darkpurple: '#7165CA',
  sub_yellow: '#FFF9C6',
  sub_mint: '#A6EEF6',
  sub_pink: '#F4B5FA',
  sub_blue: '#6CA4F6',
  sub_lightred: '#FF6969',
  sub_yellowgreen: '#86DC68',
  transparent_purple: '#8D7EFD29',
  transparent_white: '#FFFFFF1A',
  transparent_purple_10: '#8D7EFD1A',
  transparent_red_10: '#D96D6D1A',
  transparent_green_10: '#63D7C61A',
  transparent_blue_10: '#6CA4F61A',
  transparent_yellow_10: '#FFD7491A',
  transparent_yellowgreen_10: '#86DC681A',
  transparent_black: '#1E1E201A',
  transparent_black_50: '#1E1E2080',
};

type Font = {
  weight: number;
  size: number;
  lineHeight: number;
};

const FONT = ({ weight, size, lineHeight }: Font): string => `
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}rem;
`;

const fonts = {
  title_20_semibold: FONT({
    size: 2,
    weight: 600,
    lineHeight: 3.2,
  }),
  title_16_semibold: FONT({
    size: 1.6,
    weight: 600,
    lineHeight: 2.8,
  }),
  title_11_bold: FONT({
    size: 1.1,
    weight: 670,
    lineHeight: 1.8,
  }),
  body_14_semibold: FONT({
    size: 1.4,
    weight: 600,
    lineHeight: 2.0,
  }),
  body_14_medium: FONT({
    size: 1.4,
    weight: 500,
    lineHeight: 2.0,
  }),
  body_14_regular: FONT({
    size: 1.4,
    weight: 400,
    lineHeight: 2.0,
  }),
  body_13_medium: FONT({
    size: 1.3,
    weight: 500,
    lineHeight: 2,
  }),
  body_12_medium: FONT({
    size: 1.2,
    weight: 500,
    lineHeight: 1.8,
  }),
  body_12_regular: FONT({
    size: 1.2,
    weight: 400,
    lineHeight: 1.8,
  }),
  body_10_regular: FONT({
    size: 1,
    weight: 400,
    lineHeight: 1.5,
  }),
  btn_14_semibold: FONT({
    size: 1.4,
    weight: 600,
    lineHeight: 1.4,
  }),
  btn_14_medium: FONT({
    size: 1.4,
    weight: 500,
    lineHeight: 1.4,
  }),

  btn_11_semibold: FONT({
    size: 1.1,
    weight: 600,
    lineHeight: 1.1,
  }),
  btn_11_medium: FONT({
    size: 1.1,
    weight: 500,
    lineHeight: 1.1,
  }),
  caption_10_medium: FONT({
    size: 1,
    weight: 500,
    lineHeight: 1.5,
  }),
  caption_9_regular: FONT({
    size: 0.9,
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
