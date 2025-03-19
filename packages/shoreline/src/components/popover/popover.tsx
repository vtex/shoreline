import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import type { PopoverProps as BaseProps } from '@ariakit/react'
import { Popover as BasePopover } from '@ariakit/react'

/**
 * Popover containers allow merchants to access and interact with more
 * information of an item through an overlay.
 *
 * @example
 *  <PopoverProvider>
 *    <PopoverTrigger>Trigger</PopoverTrigger>
 *    <Popover>Content</Popover>
 *  </PopoverProvider>
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(props, ref) {
    const { children, asChild = false, portal = true, ...otherProps } = props

    return (
      <BasePopover
        data-sl-popover
        ref={ref}
        render={asChild && (children as any)}
        portal={portal}
        gutter={4}
        {...otherProps}
      >
        {children}
      </BasePopover>
    )
  }
)

export interface PopoverOptions extends Pick<BaseProps, 'getAnchorRect'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Should activate portal
   * @default true
   */
  portal?: boolean
}

export type PopoverProps = PopoverOptions & ComponentPropsWithoutRef<'div'>
