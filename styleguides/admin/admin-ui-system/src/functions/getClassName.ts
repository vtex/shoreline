import { get, cssResolver, cssExtractor } from './lib'
import { pick } from './pick'
import { Theme, SxStyleProp, PropsWithStyles } from '../types'
import { availableStyleProps } from '../constants'
import { merge } from './merge'

type GetClassNameParams = {
  props?: PropsWithStyles<unknown>
  themeKey?: string
  theme: Theme
}

/**
 * Return a className after resolve styles, styleProps and stylePatterns
 * ? Should we make the name smaller to that it can be used inline ?
 */
export function getClassName(params: GetClassNameParams) {
  const { props = {}, themeKey = '', theme = {} } = params
  const defaultTheme = get(theme, themeKey, {})
  const inlineStyles = get(props, 'styles', {})

  const { patternProps, styleProps } = getStyleProps({
    theme,
    props,
  })

  const styles = merge(defaultTheme, patternProps, styleProps, inlineStyles)

  return resolveCSS({ theme, styles })
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
}

/**
 * 🤖 Return unresolved style props from theme
 * Picks all variants from token entries
 * TODO: Rename properties
 */
export function getStyleProps(params: GetPatternParams) {
  const { theme, props = {} } = params

  const patternKeys = Object.keys(get(theme, 'patterns', {}))
  const patterns = pick(props, ...patternKeys)
  const styleProps = pick(props, ...availableStyleProps)

  const patternProps = Object.keys(patterns).reduce((acc, key) => {
    const patternPath = `patterns.${key}.${get(patterns, key, '')}`
    const styleObject = get(theme, patternPath, {})

    return { ...acc, ...styleObject }
  }, {})

  return { patternProps, styleProps }
}
