import styled from "@emotion/styled";
import * as React from "react";
import TextThemeContext, { TextTheme } from "./TextThemeContext";

interface Props extends React.Attributes {
  headingLevel?: TextHeadingLevel;
  maxLines?: number;
  alignment?: TextAlignment;
  color?: string;
  selectable?: boolean;
  className?: string;
  children?: string;
}

function Text({
  headingLevel = TextHeadingLevel.none,
  maxLines = 0,
  alignment,
  color,
  selectable,
  ...props
}: Props): React.ReactElement {
  const Component = Root.withComponent(getTagName(headingLevel));
  const textTheme: TextTheme = React.useContext(TextThemeContext) || {};

  const _alignment = merge(
    alignment,
    textTheme.alignment,
    TextAlignment.default
  );
  const _color = merge(color, textTheme.color, "#2f3542");
  const _selectable = merge(selectable, textTheme.selectable, true);

  return (
    <Component
      alignment={_alignment}
      color={_color}
      selectable={_selectable}
      maxLines={maxLines}
      {...props}
    />
  );
}

function merge<T>(
  valueFromProps: T | undefined,
  valueFromTheme: T | undefined,
  defaultValue: T
): T {
  if (valueFromProps !== undefined) {
    return valueFromProps;
  }

  if (valueFromTheme !== undefined) {
    return valueFromTheme;
  }

  return defaultValue;
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

export enum TextAlignment {
  default = "inherit",
  start = "start",
  end = "end",
  center = "center"
}

const Root = styled.span<{
  alignment: TextAlignment;
  color: string;
  selectable: boolean;
  maxLines: number;
}>`
  margin: 0;
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: 400;
  font-family: sans-serif;
  text-align: ${({ alignment }) => alignment};
  user-select: ${({ selectable }) => (selectable ? "auto" : "none")};
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;

  ${({ maxLines }) =>
    maxLines === 0
      ? ""
      : `
    display: box;
    display: -webkit-box;
    display: -moz-box;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    line-clamp: ${maxLines};
    -webkit-line-clamp: ${maxLines};
    overflow-y: hidden;
  `}
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
