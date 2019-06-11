import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";

function LoadingSpinner(): React.ReactElement {
  return (
    <Root>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Root>
  );
}

const Root = styled.span`
  display: inline-block;
  text-align: center;
`;

const animation = keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
`;

const Bounce = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 4px;
  background-color: #dfe4ea;
  border-radius: 50%;
  vertical-align: top;
  animation: ${animation} 1000ms infinite ease-in-out both;

  &:last-child {
    margin-right: 0;
  }
`;

const Bounce1 = styled(Bounce)`
  animation-delay: -320ms;
`;

const Bounce2 = styled(Bounce)`
  animation-delay: -160ms;
`;

const Bounce3 = styled(Bounce)``;

export default LoadingSpinner;
