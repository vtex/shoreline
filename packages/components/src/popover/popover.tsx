import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Popover as BasePopover } from '@ariakit/react'
import { Container } from '../content'

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(props, ref) {
    const { children, asChild = false, ...otherProps } = props

    return (
      <Container>
        <BasePopover
          data-sl-popover
          ref={ref}
          render={asChild && (children as any)}
          {...otherProps}
        >
          {children}
        </BasePopover>
      </Container>
    )
  }
)

export interface PopoverProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
