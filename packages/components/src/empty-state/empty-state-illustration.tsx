import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * EmptyState illustration section
 * @status stable
 */
export const EmptyStateIllustration = forwardRef<
  HTMLDivElement,
  EmptyStateIllustrationProps
>(function EmptyStateIllustration(props, ref) {
  const { asChild = false, ...otherProps } = props
  const Comp = asChild ? Compose : 'div'

  return <Comp data-sl-empty-state-illustration ref={ref} {...otherProps} />
})

export interface EmptyStateIllustrationOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type EmptyStateIllustrationProps = EmptyStateIllustrationOptions &
  ComponentPropsWithoutRef<'div'>
