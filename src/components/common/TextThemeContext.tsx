import { createContext } from "react";

export interface TextTheme {
  color?: string;
  isNonselectable?: boolean;
}

const TextThemeContext = createContext<TextTheme>({});

export default TextThemeContext;
