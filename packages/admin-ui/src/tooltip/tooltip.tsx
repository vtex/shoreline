import type { FunctionComponentElement, ReactNode } from 'react'
import React, { cloneElement } from 'react'
import { useSystem } from '@vtex/admin-ui-react'

import type { TooltipStateProps } from 'ariakit/Tooltip'
import {
  useTooltipState,
  Tooltip as TooltipPopover,
  TooltipAnchor,
  TooltipArrow,
} from 'ariakit/Tooltip'
import * as style from './tooltip.style'
import { TooltipTrigger } from './tooltip-trigger'

export function Tooltip(props: TooltipProps) {
  const {
    children = (<TooltipTrigger />) as FunctionComponentElement<unknown>,
    label,
    visible,
    placement = 'bottom',
  } = props

  const { cn } = useSystem()

  const state = useTooltipState({
    placement,
    visible,
    gutter: style.tooltipGutter,
  })

  return (
    <>
      <TooltipAnchor
        state={state}
        {...(children.props as any)}
        ref={children.ref}
      >
        {(referenceProps: any) => cloneElement(children, { ...referenceProps })}
      </TooltipAnchor>
      <TooltipPopover state={state} className={cn(style.tooltipPopover)}>
        <TooltipArrow />
        {label}
      </TooltipPopover>
    </>
  )
}

export type TooltipPlacement = Pick<TooltipStateProps, 'placement'>['placement']

export interface TooltipProps {
  /**
   * Label shown inside the tooltip
   */
  label: ReactNode
  /**
   * The element that triggers the tooltip
   */
  children?: FunctionComponentElement<unknown>
  /**
   * The placement of the tooltip relative to its children
   * @default 'bottom'
   */
  placement?: TooltipPlacement
  /**
   * Whether the tooltip is visible or not
   * @default false
   */
  visible?: boolean
}
