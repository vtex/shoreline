import { createThemeConsumers } from '../createSystem'
import { WithStyles } from '../types'
import { useTheme } from './useTheme'

type Params<P> = {
  props?: WithStyles<P>
  themeKey?: string
}

/**
 * Generate a single classname after merge sx, themeKey & style props
 */
export function useClassName<P>({ props, themeKey }: Params<P>): string {
  const theme = useTheme()
  const { cn } = createThemeConsumers(theme)
  const className = cn({ ...(props?.styles ?? {}), themeKey })

  return className
}
