import type { FunctionComponentElement, ReactNode } from 'react'
import React, { cloneElement } from 'react'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'
import type { PopoverState } from 'reakit/ts'
import { useSystem } from '@vtex/onda-core'

import type { SystemComponent } from '../../types'

/**
 * Popup that displays information related to an element on :focus (by keyboard) or :hover (by mouse).
 * @example
 * ```jsx
 * import { Tooltip, Button, IconClose } from `@vtex/admin-ui`
 * <Tooltip label="Close something">
 *   <Button icon={<IconClose />} variant="tertiary" />
 * </Tooltip>
 * ```
 */
export function Tooltip(props: TooltipProps) {
  const {
    csx = {},
    children,
    label,
    placement = 'top',
    visible,
    fixed,
    baseId,
    ...tooltipProps
  } = props

  const { cn } = useSystem()

  const tooltip = useTooltipState({
    placement,
    visible,
    unstable_fixed: fixed,
    baseId,
  })

  return (
    <>
      <TooltipReference {...tooltip} {...children.props} ref={children.ref}>
        {(referenceProps) => cloneElement(children, { ...referenceProps })}
      </TooltipReference>
      <ReakitTooltip
        {...tooltip}
        {...tooltipProps}
        className={cn({
          backgroundColor: 'dark.primary',
          color: 'light.primary',
          fontSize: 1,
          paddingY: '0.5625rem',
          paddingX: 3,
          borderRadius: 3,
          maxWidth: 240,
          zIndex: 'over',
          ...csx,
        })}
      >
        {label}
      </ReakitTooltip>
    </>
  )
}

export type TooltipPlacement = Pick<PopoverState, 'placement'>['placement']

export interface TooltipProps extends SystemComponent {
  /**
   * The element that triggers the tooltip
   */
  children: FunctionComponentElement<unknown>
  /**
   * Label shown inside the tooltip
   */
  label: ReactNode
  /**
   * The placement of the tooltip relative to its children
   * @default 'top'
   */
  placement?: TooltipPlacement
  /**
   * Whether the tooltip is visible or not
   * @default false
   */
  visible?: boolean
  /**
   * Whether or not the tooltip popover should have position set to fixed.
   * @default false
   */
  fixed?: boolean
  /**
   * reakit base-id
   */
  baseId?: string
}
