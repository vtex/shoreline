import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { style } from '@vtex/shoreline-utils'

/**
 * Allows the content to bleed into the external container
 *
 * @kind layout
 * @example
 * <Bleed top="$space-2" bottom="$space-2">
 *   <Button>Text</Button>
 * </Bleed>
 */
export const Bleed = forwardRef<HTMLDivElement, BleedProps>(function Bleed(
  props,
  ref
) {
  const {
    top = '$space-0',
    bottom = '$space-0',
    start = '$space-0',
    end = '$space-0',
    children,
    ...restProps
  } = props

  return (
    <div data-sl-bleed ref={ref} {...restProps}>
      <div
        data-sl-bleed-content
        style={style({
          '--sl-bleed-top': top,
          '--sl-bleed-bottom': bottom,
          '--sl-bleed-start': start,
          '--sl-bleed-end': end,
        })}
      >
        {children}
      </div>
    </div>
  )
})

export interface BleedProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Top bleed
   * @default '$space-0'
   */
  top?: string
  /**
   * Bottom bleed
   * @default '$space-0'
   */
  bottom?: string
  /**
   * Start bleed
   * @default '$space-0'
   */
  start?: string
  /**
   * End bleed
   * @default '$space-0'
   */
  end?: string
}
