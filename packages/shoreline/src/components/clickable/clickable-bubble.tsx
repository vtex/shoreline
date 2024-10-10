import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'

import { Compose } from '../compose'
import type { ExtendedMouseEvent } from './clickable'

/**
 * Bubbles events to Clickable
 * @example
 * <Clickable>
 *  <ClickableBubble>
 *    <p>Clicking the text will bubble the Click event to Clickable</p>
 *  </ClickableBubble>
 * </Clickable>
 */
export const ClickableBubble = forwardRef<HTMLDivElement, ClickableBubbleProps>(
  function Clickable(props, ref) {
    const { onlyImmediateChild = false, onClick, ...otherProps } = props
    const clickEvent = (event: ExtendedMouseEvent): void => {
      const targetIsImmediateChild = !!event.target.getAttribute(
        'data-sl-clickable-bubble'
      )

      if (
        (onlyImmediateChild && targetIsImmediateChild) ||
        !onlyImmediateChild
      ) {
        event.target.setAttribute('data-should-bubble', 'true')
      }

      onClick?.(event)
    }

    return (
      <Compose
        data-sl-clickable-bubble
        onClick={clickEvent}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface ClickableBubbleOptions {
  /**
   * Children to bubble event
   */
  children: ReactNode
  /**
   * if true only immediate children will bubble the event
   * if false the immediate children and their children will bubble the event
   *
   * @default false
   */
  onlyImmediateChild?: boolean
}

export type ClickableBubbleProps = ClickableBubbleOptions &
  ComponentPropsWithoutRef<'div'>
