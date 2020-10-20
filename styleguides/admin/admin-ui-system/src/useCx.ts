import { useThemeUI, SxStyleProp } from '@theme-ui/core'
import { css as cssExtractor, get } from '@theme-ui/css'
import { css } from 'emotion'
import invariant from 'tiny-invariant'
import merge from 'deepmerge'

import { isObjectEmpty, pick } from './util'

/**
 * Generate a single classname after merge sx, themeKey & style props
 * @param props props to parse
 * @param themeKey key within theme to access
 */
export function useCx<P>(props: Props<P>, themeKey?: string): string {
  const { theme } = useThemeUI()

  invariant(
    !isObjectEmpty(theme) && theme,
    '💥 Make sure that you are under the ThemeProvider'
  )

  const styles = getStyles({ props, themeKey })
  const patternsStyleObject = getPatternStyles({ theme, props })
  const className = getClassName({ theme, patternsStyleObject, styles })

  return className
}

function getStyles({ props, themeKey }: any) {
  // 🤔 Choose between styles.variant (prefered) or themeKey
  const variant = get(props.styles, 'variant', themeKey)
  const styles = { variant, ...props.styles }

  return styles
}

function getClassName({ theme, patternsStyleObject, styles }: any) {
  // 🎯 Merges the styles from style props & create a className
  // ⚠️ styles prop has preference
  const mergedTheme = merge<SxStyleProp>(patternsStyleObject, styles)
  const extractedThemeObject = cssExtractor(mergedTheme)(theme)
  const className = css(extractedThemeObject)

  return className
}

function getPatterns({ theme, props }: any) {
  const patternKeys = Object.keys(get(theme, 'patterns', {}))
  const patterns = pick(props, ...patternKeys)

  return patterns
}

function getPatternStyles({ theme, props }: any) {
  const patterns = getPatterns({ theme, props })

  // 🤖 Return unresolved style props from theme
  // Picks all variants from token entries
  // TODO RENAME
  const patternsStyleObject = Object.keys(patterns).reduce((acc, key) => {
    const patternPath = `patterns.${key}.${get(patterns, key, '')}`
    const styleObject = get(theme, patternPath, {})

    return { ...acc, ...styleObject }
  }, {})

  return patternsStyleObject
}

type Props<P> = P & {
  styles?: SxStyleProp
}
