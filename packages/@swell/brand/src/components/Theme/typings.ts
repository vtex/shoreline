import { Theme as ThemeUITheme } from "theme-ui";

export interface Colors {
  /**
   * Default color of every text
   */
  text: string;
  /**
   * Color of the main bg
   */
  background: string;
  /**
   * Color of the focus ring
   */
  focus: string;
  /**
   * Muted colors
   */
  muted: string[];
  /**
   * Semantic colors to represent different action states & feedbacks
   */
  primary: SemanticShades;
}

/**
 * All possible semantic colors
 */
export type SemanticColors = "primary";

/**
 * Feedback color shades for every state
 */
export interface SemanticShades {
  base: string;
  hover: string;
  active: string;
  contrast: string;
  washed: string;
}

export interface Theme extends Omit<ThemeUITheme, "colors"> {
  colors: Colors;
}

export interface ThemeContext {
  theme: Theme;
  colorMode: string;
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
}
