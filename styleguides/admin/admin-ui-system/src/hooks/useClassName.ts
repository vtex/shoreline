import { getClassName } from '../functions'
import { PropsWithStyles } from '../types'
import { useTheme } from './useTheme'

type Params<P> = {
  props?: PropsWithStyles<P>
  themeKey?: string
}

/**
 * Generate a single classname after merge sx, themeKey & style props
 */
export function useClassName<P>({ props, themeKey }: Params<P>): string {
  const theme = useTheme()
  const className = getClassName({ props, themeKey, theme })

  return className
}
