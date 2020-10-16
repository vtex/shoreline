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

  const patternKeys = Object.keys(get(theme, 'patterns', {}))
  const { styles = {} } = props

  // 🤔 Choose between styles.variant (prefered) or themeKey
  const variant = get(styles, 'variant', themeKey)
  const sxWithKey = { variant, ...styles }

  // 🎨 extract & rename style props
  // const cssProps = pickCSSProps(props)
  // const resolvedProps = renameKeys({ ...cssEventProps, ...flexBox }, cssProps)

  // alternative
  const cssProps = pick(props, ...patternKeys)

  // 🤖 Return unresolved style props from theme
  // Picks all variants from token entries
  const patternsStyleObject = Object.keys(cssProps).reduce((acc, key) => {
    const patternPath = `patterns.${key}.${get(cssProps, key, '')}`
    const styleObject = get(theme, patternPath, {})

    return { ...acc, ...styleObject }
  }, {})

  // 🎯 Merges the styles from style props & create a className
  // ⚠️ styles prop has preference
  const mergedTheme = merge<SxStyleProp>(patternsStyleObject, sxWithKey)
  const extractedThemeObject = cssExtractor(mergedTheme)(theme)
  const className = css(extractedThemeObject)

  return className
}

type Props<P> = P & {
  styles?: SxStyleProp
}
