import type { CSSProperties, ReactNode } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

import { Compose } from '../compose'

/**
 * Placeholder for stuctural composition
 * @example
 * <Slot>Content</Slot>
 */
export const Slot = forwardRef<HTMLDivElement, SlotProps>(function Slot(
  props,
  ref
) {
  const { asChild = false, ...otherProps } = props
  const Comp = asChild ? Compose : 'div'

  return <Comp data-sl-slot ref={ref} {...otherProps} />
})

export interface SlotProps {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * ClassName used for styling
   */
  className?: string
  /**
   * Style property
   */
  style?: CSSProperties
  /**
   * Children prop
   */
  children?: ReactNode
}
