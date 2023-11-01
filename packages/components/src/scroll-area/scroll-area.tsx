import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Root, Viewport, Scrollbar, Thumb } from '@radix-ui/react-scroll-area'

/**
 * Cross-browser scroll styling
 * @example
 * <ScrollArea>
 *   Content
 * </ScrollArea>
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(props, ref) {
    const {
      type = 'hover',
      scrollHideDelay = 600,
      children,
      ...otherProps
    } = props

    return (
      <Root
        type={type}
        scrollHideDelay={scrollHideDelay}
        data-sl-scroll-area
        ref={ref}
        {...otherProps}
      >
        <Viewport data-sl-scroll-area-viewport>{children}</Viewport>
        <Scrollbar data-sl-scroll-area-scrollbar orientation="vertical">
          <Thumb data-sl-scroll-area-thumb />
        </Scrollbar>
        <Scrollbar data-sl-scroll-area-scrollbar orientation="horizontal">
          <Thumb data-sl-scroll-area-thumb />
        </Scrollbar>
      </Root>
    )
  }
)

type DivProps = Omit<ComponentPropsWithoutRef<'div'>, 'dir'>

export interface ScrollAreaProps extends DivProps {
  /**
   * Scroll type
   * @default 'hover'
   */
  type?: 'hover' | 'auto' | 'always' | 'scroll'
  /**
   * Timeout (in ms) to hide the scrollbar
   * @default 600
   */
  scrollHideDelay?: number
}
