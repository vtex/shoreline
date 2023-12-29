import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Anchor component
 * @example
 * <Link href="https://vtex.com">Go to VTEX</Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const { asChild, ...otherProps } = props
  const Comp = asChild ? Compose : 'a'

  return <Comp data-sl-link ref={ref} {...otherProps} />
})

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
