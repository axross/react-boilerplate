import { css, Global } from "@emotion/core";
import * as React from "react";

function GlobalStyle() {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
        }
      `}
    />
  );
}

export default GlobalStyle;
