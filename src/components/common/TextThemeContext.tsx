import { createContext } from "react";
import { TextAlignment } from "./Text";

export interface TextTheme {
  alignment?: TextAlignment;
  color?: string;
  selectable?: boolean;
}

const TextThemeContext = createContext<TextTheme>({});

export default TextThemeContext;
