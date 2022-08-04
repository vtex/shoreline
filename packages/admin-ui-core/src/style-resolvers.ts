import type { AnyObject } from '@vtex/admin-ui-util'
import { resolveCssValue } from './helpers'

export function negative(token: string) {
  return (cssProperty: string): string => {
    const value = resolveCssValue(token, cssProperty)
    const isCssVar = value.startsWith('var(--')

    return isCssVar ? `calc(-1 * ${value})` : `-${value}`
  }
}
