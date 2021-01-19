import { createEmotionInstance, createThemeConsumers } from '../createSystem'
import { StyleObject } from '../types'
import { useTheme } from './useTheme'

const emotionInstance = createEmotionInstance('vtex-admin-ui-icons')

/**
 * Generate a single classname after merge sx, themeKey & style props
 */
export function useClassName(styles: StyleObject): string {
  const theme = useTheme()
  const { cn } = createThemeConsumers(theme, emotionInstance)
  const className = cn(styles)

  return className
}
