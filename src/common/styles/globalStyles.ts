import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import { theme } from './theme';

const globalStyles = css`
  ${emotionNormalize}

  html {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    color: #fff;
    background-color: ${theme.colors.background};
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  input,
  textarea,
  select {
    all: unset;
  }

  /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
  input,
  textarea {
    user-select: auto;
  }

  /* input number 화살표 제거 */
  /* stylelint-disable property-no-vendor-prefix */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-out-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* Firefox에서 input number 화살표 없애는 방법 */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -mox-appearance: none;
    appearance: none;
  }
`;

export default globalStyles;
