import styled from "@emotion/styled";
import * as React from "react";
import TextThemeContext, { TextTheme } from "./TextThemeContext";

interface Props extends React.Attributes {
  color?: ButtonColor;
  disabled?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
  children: React.ReactNode;
}

function Button({
  color = ButtonColor.primary,
  disabled,
  onClick,
  ...props
}: Props): React.ReactElement {
  const textTheme = createTextTheme(color);

  return (
    <TextThemeContext.Provider value={textTheme}>
      <Root
        color={color}
        onClick={disabled ? undefined : onClick}
        onKeyDown={e => e.keyCode === 32 && !disabled && onClick && onClick(e)}
        tabIndex={0}
        {...props}
      />
    </TextThemeContext.Provider>
  );
}

export enum ButtonColor {
  primary = "PRIMARY",
  accent = "ACCENT",
  secondary = "SECONDARY"
}

const Root = styled.span<{ color: ButtonColor }>`
  display: inline-block;
  padding: 8px 16px;
  background-color: ${({ color }) => BACKGROUND_COLORS.get(color)};
  border-radius: 4px;
  box-shadow: #f1f2f6 0px 0px 0px 1px, #f1f2f6 0px 2px 4px;
  cursor: pointer;
  transition: box-shadow 125ms ease-in-out 0ms;

  &:focus,
  &:active {
    box-shadow: #eccc68 0 0 0 3px;
  }

  &:focus {
    outline: none;
  }
`;

function createTextTheme(color: ButtonColor): TextTheme {
  let textColor: string;

  switch (color) {
    case ButtonColor.primary:
    case ButtonColor.accent:
      textColor = "#fff";
      break;
    default:
      textColor = "#2f3542";
  }

  return {
    color: textColor,
    isNonselectable: true
  };
}

const BACKGROUND_COLORS = new Map<ButtonColor, string>([
  [ButtonColor.primary, "#1e90ff"],
  [ButtonColor.accent, "#ff6348"],
  [ButtonColor.secondary, "#f1f2f6"]
]);

export default Button;
