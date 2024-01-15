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

  h1 {
    margin: 0;
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

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default globalStyles;
