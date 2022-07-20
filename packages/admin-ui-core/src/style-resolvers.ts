import type { AnyObject } from '@vtex/admin-ui-util'
import { getTokenValue } from './styles'

export function negative(token: string) {
  return (theme: AnyObject, cssProperty: string): string => {
    const value = getTokenValue(theme, cssProperty, token)

    return `-${value}`
  }
}
