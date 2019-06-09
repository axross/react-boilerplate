import styled from "@emotion/styled";
import * as React from "react";
import TextThemeContext, { TextTheme } from "./TextThemeContext";

interface Props extends React.Attributes {
  headingLevel?: TextHeadingLevel;
  lineThrough?: boolean;
  nonselectable?: boolean;
  className?: string;
  children?: string;
}

function Text({
  headingLevel = TextHeadingLevel.none,
  lineThrough = false,
  nonselectable = false,
  ...props
}: Props): React.ReactElement {
  const textTheme: TextTheme = React.useContext(TextThemeContext) || {};
  const tagName = getTagName(headingLevel);
  const Component = Root.withComponent(tagName);

  return (
    <Component
      theme={textTheme}
      lineThrough={lineThrough}
      nonselectable={nonselectable}
      {...props}
    />
  );
}

export enum TextHeadingLevel {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  none = "none"
}

const Root = styled.span<{
  theme: TextTheme;
  lineThrough: boolean;
  nonselectable: boolean;
}>`
  margin: 0;
  color: ${({ theme }) => theme.color || "#2f3542"};
  font-size: 16px;
  font-weight: 400;
  font-family: sans-serif;
  text-decoration: ${({ lineThrough }) =>
    lineThrough ? "line-through" : "auto"};
  user-select: ${({ theme, nonselectable }) =>
    theme.isNonselectable || nonselectable ? "none" : "auto"};
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
`;

function getTagName(
  headingLevel: TextHeadingLevel
): keyof JSX.IntrinsicElements {
  switch (headingLevel) {
    case TextHeadingLevel.h1:
    case TextHeadingLevel.h2:
    case TextHeadingLevel.h3:
    case TextHeadingLevel.h4:
    case TextHeadingLevel.h5:
    case TextHeadingLevel.h6:
      return headingLevel as keyof JSX.IntrinsicElements;
    default:
      return "span";
  }
}

export default Text;
