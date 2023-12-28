import type { CSSProperties } from 'react'
import { cssVar } from './css-var'
import type { AnyObject } from './utility-types'

export interface ShorelineCSSProperties extends CSSProperties {
  [key: `--sl-${string}`]: string | number | boolean
}

/**
 * Applies css variables on style
 * @example
 * <div style={style({ padding: '$space-3' })} />
 */
export function style(cssProps: ShorelineCSSProperties): CSSProperties {
  const result: AnyObject = {}

  for (const prop in cssProps) {
    const value = cssProps[prop as keyof ShorelineCSSProperties]
    const variable =
      typeof value === 'string'
        ? cssVar({ token: String(value), deepSearch: true })
        : value

    result[prop] = variable
  }

  return result as CSSProperties
}
