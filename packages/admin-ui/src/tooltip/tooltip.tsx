import type { FunctionComponentElement } from 'react'
import React, { cloneElement } from 'react'
import { useSystem } from '@vtex/admin-ui-react'
import type { TooltipStateProps } from 'ariakit/Tooltip'
import {
  useTooltipState,
  Tooltip as TooltipPopover,
  TooltipAnchor,
  TooltipArrow,
} from 'ariakit'

import * as style from './tooltip.style'
import { TooltipTrigger } from './tooltip-trigger'

/**
 * Popup that displays information related to an element on :focus (by keyboard) or :hover (by mouse)
 * @example
 * <Tooltip label="Label" />
 */
export function Tooltip(props: TooltipProps) {
  const {
    text,
    visible,
    children,
    placement = 'bottom',
    bleedX = false,
    bleedY = false,
  } = props

  const hasChildren = children

  const { cn } = useSystem()
  const state = useTooltipState({
    placement,
    open: visible,
    gutter: hasChildren ? 2 : 0,
  })

  const tooltipAnchorChildren: FunctionComponentElement<unknown> = children ?? (
    <TooltipTrigger bleedX={bleedX} bleedY={bleedY} />
  )

  return (
    <>
      <TooltipAnchor
        state={state}
        {...(tooltipAnchorChildren.props as any)}
        ref={tooltipAnchorChildren.ref}
      >
        {(referenceProps: any) =>
          cloneElement(tooltipAnchorChildren, { ...referenceProps })
        }
      </TooltipAnchor>
      <TooltipPopover state={state} className={cn(style.tooltipPopover)}>
        <TooltipArrow style={style.tooltipArrow} />
        {text}
      </TooltipPopover>
    </>
  )
}

export type TooltipPlacement = Pick<TooltipStateProps, 'placement'>['placement']

export interface TooltipProps {
  /**
   * Text shown inside the tooltip
   */
  text: string
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
  /**
   * Vertical bleed
   */
  bleedY?: boolean
  /**
   * Horizontal bleed
   */
  bleedX?: boolean
}
