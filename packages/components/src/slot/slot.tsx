import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Placeholder for stuctural composition
 * @example
 * <Slot>Content</Slot>
 */
export const Slot = forwardRef<HTMLDivElement, SlotProps>(function Slot(
  props,
  ref
) {
  const { asChild = false, name = '', ...otherProps } = props
  const Comp = asChild ? Compose : 'div'

  return <Comp data-sl-slot={name} ref={ref} {...otherProps} />
})

export interface SlotOptions {
  /**
   * Optional slot label
   */
  name?: string
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type SlotProps = SlotOptions & ComponentPropsWithoutRef<'div'>
