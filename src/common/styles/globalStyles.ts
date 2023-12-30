import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const globalStyles = css`
  ${emotionNormalize}

   * {
        box-sizing: border-box;
        padding : 0;
        margin: 0;
      }

      html{
        font-size: 62.5%;
      }

      button {
        cursor: pointer;
        background: none;
        border: none;
      }

`


export default globalStyles;