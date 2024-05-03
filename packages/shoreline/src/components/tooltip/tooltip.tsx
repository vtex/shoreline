import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import type { TooltipProviderProps } from './tooltip-provider'
import { TooltipProvider } from './tooltip-provider'
import { TooltipTrigger } from './tooltip-trigger'
import { TooltipPopover } from './tooltip-popover'
import { TooltipArrow } from './tooltip-arrow'

/**
 * Tooltips display a label that was omitted when hovering the element. They shouldn't be essential for users to complete tasks.
 * @status stable
 * @example
 * <Tooltip text="Text">
 *   <button>i</button>
 * </Tooltip>
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      children,
      label,
      timeout,
      open,
      setOpen,
      defaultOpen,
      placement,
      ...otherProps
    } = props

    return (
      <TooltipProvider
        timeout={timeout}
        open={open}
        setOpen={setOpen}
        defaultOpen={defaultOpen}
        placement={placement}
      >
        <span data-sl-tooltip ref={ref} {...otherProps}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipPopover>
            <TooltipArrow />
            {label}
          </TooltipPopover>
        </span>
      </TooltipProvider>
    )
  }
)

type InheritedOptions = Pick<
  TooltipProviderProps,
  'placement' | 'open' | 'setOpen' | 'defaultOpen' | 'timeout'
>

export interface TooltipOptions extends InheritedOptions {
  /**
   * Text displayed on the popover
   */
  label: ReactNode
}

export type TooltipProps = TooltipOptions & ComponentPropsWithoutRef<'span'>
