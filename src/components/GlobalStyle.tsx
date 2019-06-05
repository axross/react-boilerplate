import { css, Global } from "@emotion/core";
import * as React from "react";

function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;

          &:focus {
            outline: none;
          }
        }

        body {
          margin: 0;
        }
      `}
    />
  );
}

export default GlobalStyle;
