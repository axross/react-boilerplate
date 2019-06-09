import styled from "@emotion/styled";
import * as React from "react";
import Logo from "./images/Logo";
import Text, { TextHeadingLevel } from "./Text";

interface Props extends React.Attributes {
  title: string;
  actions: React.ReactElement | React.ReactElement[];
  className?: string;
}

function NavigationBar({ title, actions, ...props }: Props) {
  return (
    <Root {...props}>
      <_Logo />

      <AppName headingLevel={TextHeadingLevel.h1}>{title}</AppName>

      <Actions>{actions}</Actions>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-template-areas: "logo title . actions";
  align-items: center;
  column-gap: 8px;
  height: 48px;
  padding: 0 8px;
`;

const _Logo = styled(Logo)`
  grid-area: logo;
  width: 32px;
  height: 32px;
`;

const AppName = styled(Text)`
  grid-area: title;
  font-size: 20px;
`;

const Actions = styled.div`
  grid-area: actions;
`;

export default NavigationBar;
