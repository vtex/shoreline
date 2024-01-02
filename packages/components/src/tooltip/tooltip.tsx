import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import type { TooltipProviderProps } from './tooltip-provider'
import { TooltipProvider } from './tooltip-provider'
import { TooltipTrigger } from './tooltip-trigger'
import { TooltipPopover } from './tooltip-popover'
import { TooltipArrow } from './tooltip-arrow'

/**
 * Tooltip component
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

type InheritedProps = ComponentPropsWithoutRef<'span'> &
  Pick<
    TooltipProviderProps,
    'placement' | 'open' | 'setOpen' | 'defaultOpen' | 'timeout'
  >

export interface TooltipProps extends InheritedProps {
  /**
   * Text displayed on the popover
   */
  label: ReactNode
}
