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
    box-sizing: border-box;
  }

  /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
  input,
  textarea {
    user-select: auto;

    &:focus {
      border: 1px solid ${theme.colors.gray_200};
      outline: none;
    }
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

  svg {
    cursor: pointer;
  }

  ul,
  li {
    list-style: none;
  }
`;

export default globalStyles;
