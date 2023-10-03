import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cssVar, cx } from '@vtex/shoreline-utils'

import { bleedStyle, bleedInnerChildStyle } from './bleed.css'

const defaultBleed = false

export const Bleed = forwardRef<HTMLDivElement, BleedProps>(function Bleed(
  props,
  ref
) {
  const {
    top = defaultBleed,
    left = defaultBleed,
    bottom = defaultBleed,
    right = defaultBleed,
    horizontal = defaultBleed,
    vertical = defaultBleed,
    className,
    children,
    ...restProps
  } = props

  return (
    <div
      ref={ref}
      className={cx(bleedStyle, className)}
      style={getBleedVariables({
        top,
        left,
        bottom,
        right,
        horizontal,
        vertical,
      })}
      {...restProps}
    >
      <div className={bleedInnerChildStyle}>{children}</div>
    </div>
  )
})

function getBleedVariables(
  values: Required<BleedShorthandProps>
): CSSProperties {
  return {
    '--sl-bleed-top': cssVar({ token: String(values.top) }),
    '--sl-bleed-right': cssVar({ token: String(values.right) }),
    '--sl-bleed-bottom': cssVar({ token: String(values.bottom) }),
    '--sl-bleed-left': cssVar({ token: String(values.left) }),
    '--sl-bleed-horizontal': cssVar({ token: String(values.horizontal) }),
    '--sl-bleed-vertical': cssVar({ token: String(values.vertical) }),
  } as CSSProperties
}

export type BleedProps = BleedShorthandProps & ComponentPropsWithoutRef<'div'>

interface BleedShorthandProps {
  /**
   * Top bleed
   * @default 0
   */
  top?: string | number | boolean
  /**
   * Bottom bleed
   * @default 0
   */
  bottom?: string | number | boolean
  /**
   * Left bleed
   * @default 0
   */
  left?: string | number | boolean
  /**
   * Right bleed
   * @default 0
   */
  right?: string | number | boolean
  /**
   * Horizontal bleed
   * @default 0
   */
  horizontal?: string | number | boolean
  /**
   * Vertical bleed
   * @default 0
   */
  vertical?: string | number | boolean
}
