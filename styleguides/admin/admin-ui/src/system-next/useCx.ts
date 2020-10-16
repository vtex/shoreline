import { useThemeUI, SxStyleProp } from '@theme-ui/core'
import { css as cssExtractor, get } from '@theme-ui/css'
import { css } from 'emotion'
import invariant from 'tiny-invariant'
import merge from 'deepmerge'

import { isObjectEmpty, pickCSSProps, renameKeys } from './util'
import { flexBox, cssEventProps } from './mappings'

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

  const { styles = {} } = props

  // 🤔 Choose between styles.variant (prefered) or themeKey
  const variant = get(styles, 'variant', themeKey)
  const sxWithKey = { variant, ...styles }

  // 🎨 extract & rename style props
  const cssProps = pickCSSProps(props)
  const resolvedProps = renameKeys({ ...cssEventProps, ...flexBox }, cssProps)

  // 🎯 Merges the styles from style props & create a className
  // ⚠️ styles prop has preference
  const mergedTheme = merge<SxStyleProp>(resolvedProps, sxWithKey)
  const extractedThemeObject = cssExtractor(mergedTheme)(theme)
  const className = css(extractedThemeObject)

  return className
}

type Props<P> = P & {
  styles?: SxStyleProp
}
