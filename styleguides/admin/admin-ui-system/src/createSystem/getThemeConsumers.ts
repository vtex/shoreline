import { get, merge } from '../util'
import { WithStyles, SxStyleProp } from '../types'
import { resolveStyles } from './resolveStyles'
import { getStyleProps } from './getStyleProps'
import { availableStyleProps } from '../constants'

interface GetConsumersParams<T> {
  theme: T
  patternKey?: string
  styleKeys?: string[]
}

/**
 * Return a className after resolve styles, styleProps and stylePatterns
 * ? Should we make the name smaller to that it can be used inline ?
 */
export function getThemeConsumers<T>({
  theme,
  patternKey = 'patterns',
  styleKeys = availableStyleProps,
}: GetConsumersParams<T>) {
  return {
    getClassName(params: { props?: WithStyles<unknown>; themeKey?: string }) {
      const { props = {}, themeKey = '' } = params
      const defaultTheme = get((theme as unknown) as object, themeKey, {})
      const inlineStyles = get(props, 'styles', {})

      const { patternProps, styleProps } = getStyleProps({
        theme,
        props,
        patternKey,
        styleKeys,
      })

      const styles = merge(defaultTheme, patternProps, styleProps, inlineStyles)

      return resolveStyles({ theme, styles })
    },
    componentStyles(themeKey: string) {
      const styles = get((theme as unknown) as object, themeKey, {})

      return resolveStyles({ theme, styles })
    },
    patternStyles(props: unknown) {
      const { patternProps, styleProps } = getStyleProps({
        theme,
        props,
        patternKey,
        styleKeys,
      })

      const styles = merge(patternProps, styleProps)

      return resolveStyles({ theme, styles })
    },
    cn(styles: SxStyleProp) {
      return resolveStyles({ theme, styles })
    },
  }
}
