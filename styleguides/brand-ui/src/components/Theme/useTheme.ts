import { useThemeUI } from "theme-ui";
import { ThemeContext } from "./typings";

/**
 * Hook that returns the ThemeContext
 *
 * @example Access theme values
 * function ThemeAwareComponent() {
 *  const { theme } = useTheme()
 *  return <div sx={{ color: theme.colors.text }} />
 * }
 *
 * @example Color mode toggle
 * function ThemeToggle() {
 *  const { colorMode, setColorMode } = useTheme()
 *
 *  const isDark = colorMode === 'dark'
 *  const toggle = () => isDark ? "light" : "dark"
 *
 *  return (
 *    <button onClick={toggle}>
 *      {isDark ? "Turn Light" : "Turn Dark" }
 *    </button>
 *  )
 * }
 */
export const useTheme = (useThemeUI as unknown) as () => ThemeContext;
