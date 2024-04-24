import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Empty actions section
 * @status stable
 */
export const EmptyStateActions = forwardRef<
  HTMLDivElement,
  EmptyStateActionsProps
>(function EmptyStateActions(props, ref) {
  const { asChild = false, ...otherProps } = props
  const Comp = asChild ? Compose : 'div'

  return <Comp data-sl-empty-state-actions ref={ref} {...otherProps} />
})

export interface EmptyStateActionsOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type EmptyStateActionsProps = EmptyStateActionsOptions &
  ComponentPropsWithoutRef<'div'>
