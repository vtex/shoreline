import { get, merge, cssResolver, cssExtractor } from './lib'
import { pick } from './pick'
import { Theme, SxStyleProp, PropsWithStyles } from '../types'
import { availableStyleProps } from '../constants'

type GetClassNameParams = {
  props?: PropsWithStyles<unknown>
  themeKey?: string
  theme: Theme
}

/**
 * Return a className after resolve styles, styleProps and stylePatterns
 * ? Should we make the name smaller to that it can be used inline ?
 */
export function getClassName({ props, themeKey, theme }: GetClassNameParams) {
  const draftStyles = selectVariant({ props, themeKey })
  const styles = getStyleProps({
    theme,
    props,
    styles: draftStyles,
  })

  return resolveCSS({ theme, styles })
}

type SelectVariantParams = {
  props?: PropsWithStyles<unknown>
  themeKey?: string
}

/**
 * Choose between styles.variant (prefered) or themeKey
 */
export function selectVariant(params: SelectVariantParams) {
  const { props = {}, themeKey = '' } = params

  const baseStyles = get(props, 'styles', {})
  const variant = get(baseStyles, 'variant', themeKey)
  const styles = { variant, ...baseStyles }

  return styles
}

type ResolverParams = {
  theme: Theme
  styles: SxStyleProp
}

/**
 * Resolve styles
 * @returns className as a string
 */
export function resolveCSS({ theme, styles }: ResolverParams) {
  const extractedThemeObject = cssExtractor(styles)(theme)
  const className = cssResolver(extractedThemeObject)

  return className
}

type GetPatternParams = {
  theme: Theme
  props?: PropsWithStyles<unknown>
  styles: SxStyleProp
}

/**
 * 🤖 Return unresolved style props from theme
 * Picks all variants from token entries
 * TODO: Rename properties
 */
export function getStyleProps(params: GetPatternParams) {
  const { theme, props = {}, styles } = params

  const patternKeys = Object.keys(get(theme, 'patterns', {}))
  const patterns = pick(props, ...patternKeys)
  const styleProps = pick(props, ...availableStyleProps)

  const patternsStyleObject = Object.keys(patterns).reduce((acc, key) => {
    const patternPath = `patterns.${key}.${get(patterns, key, '')}`
    const styleObject = get(theme, patternPath, {})

    return { ...acc, ...styleObject }
  }, {})

  const mergedTheme = merge<SxStyleProp>(
    { ...patternsStyleObject, ...styleProps },
    styles
  )

  return mergedTheme
}
