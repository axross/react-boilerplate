import { createContext } from "react";

export interface TextTheme {
  color?: string;
  selectable?: boolean;
}

const TextThemeContext = createContext<TextTheme>({});

export default TextThemeContext;
