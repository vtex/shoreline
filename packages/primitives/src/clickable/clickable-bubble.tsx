import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Compose } from '../compose'

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
    return <Compose data-sl-clickable-bubble ref={ref} {...props} />
  }
)

export interface ClickableBubbleOptions {
  /**
   * Children to bubble event
   */
  children: ReactNode
}

export type ClickableBubbleProps = ClickableBubbleOptions &
  ComponentPropsWithoutRef<'div'>
