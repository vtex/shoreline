import { useThemeUI, SxStyleProp } from '@theme-ui/core'
import { css as cssExtractor } from '@theme-ui/css'
import { css } from 'emotion'
import invariant from 'tiny-invariant'
import merge from 'deepmerge'

import { isObjectEmpty, pickCSSProps, renameKeys } from './util'
import { flexBox, cssEventProps } from './mappings'

type Props<P> = P & {
  sx?: SxStyleProp
  themeKey?: string
}

export function useCx<P>(props: Props<P>): string {
  const { theme } = useThemeUI()

  invariant(theme, '☠️ Make sure that you are under the ThemeProvider')

  invariant(
    !isObjectEmpty(theme),
    '☠️ Make sure that you are under the ThemeProvider'
  )

  const { sx = {}, themeKey } = props
  const variant = (sx as any)?.variant ?? themeKey
  const sxWithKey = { ...sx, variant }
  const cssProps = pickCSSProps(props)

  // rename event keys such as :hover :focus
  const resolvedProps = renameKeys({ ...cssEventProps, ...flexBox }, cssProps)

  const styled = merge<SxStyleProp>(sxWithKey, resolvedProps)

  const extractedThemeObject = cssExtractor(styled)(theme)
  const className = css(extractedThemeObject)

  return className
}
