import type { CSSProperties } from 'react'

export function style(styleObject: ExtendedCSSProperties): CSSProperties {
  return styleObject
}

export interface ExtendedCSSProperties extends CSSProperties {
  [a: `--${string}`]: string | number | boolean
}
