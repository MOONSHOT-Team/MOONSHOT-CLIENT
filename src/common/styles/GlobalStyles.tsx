import { Global, css } from "@emotion/react";
import emotionNormalize from 'emotion-normalize';

const style = css`
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
      }

`

const GlobalStyles = ()=> <Global styles={style} />

export default GlobalStyles;