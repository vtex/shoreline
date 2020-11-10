import { css as cssExtractor } from '@theme-ui/css'
import { css as cssResolver } from 'emotion'

import { SxStyleProp } from '../types'

/**
 * Resolve styles
 * @returns a single string className
 */
export function resolveStyles<T>(params: ResolveStylesParams<T>): string {
  const { theme = {}, styles = {} } = params

  const extractedThemeObject = cssExtractor(styles)(theme)
  const className = cssResolver(extractedThemeObject)

  return className
}

export interface ResolveStylesParams<T> {
  /**
   * target theme
   * @default {}
   */
  theme: T
  /**
   * styles to be compiled
   * @default {}
   */
  styles?: SxStyleProp
}
