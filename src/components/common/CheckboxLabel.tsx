import styled from "@emotion/styled";
import * as React from "react";

export interface Props extends React.Attributes {
  className?: string;
  children: React.ReactNode;
}

function CheckboxLabel(props: Props): React.ReactElement {
  return <Root {...props} />;
}

const Root = styled.span``;

export default CheckboxLabel;
