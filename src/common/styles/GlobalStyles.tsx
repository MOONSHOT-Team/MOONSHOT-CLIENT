import { Global, css } from "@emotion/react";
import reset from "./reset";


const GlobalStyles = () => (
  <Global
    styles={css`
      ${reset}

      /* @font-face {
        font-family: ;
        src: url();
      } */

      * {
        box-sizing: border-box;
      }
      button {
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    `}
  />
);

export default GlobalStyles;