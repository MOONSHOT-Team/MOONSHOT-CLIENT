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

  button {
    cursor: pointer;
    background: none;
    border: none;
  }
`;

export default globalStyles;
