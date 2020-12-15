import React, { FunctionComponentElement, cloneElement, ReactNode } from 'react'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'
import { PopoverState } from 'reakit/ts'

import { Overridable } from '../../types'
import { Box } from '../Box'

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
    styleOverrides = {},
    children,
    label,
    placement = 'top',
    visible,
    fixed,
    baseId,
    ...tooltipProps
  } = props

  const tooltip = useTooltipState({
    placement,
    visible,
    // eslint-disable-next-line @typescript-eslint/camelcase
    unstable_fixed: fixed,
    baseId,
  })

  return (
    <>
      <TooltipReference {...tooltip} {...children.props} ref={children.ref}>
        {(referenceProps) => cloneElement(children, { ...referenceProps })}
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...tooltipProps}>
        <Box themeKey="components.tooltip" styles={styleOverrides}>
          {label}
        </Box>
      </ReakitTooltip>
    </>
  )
}

export type TooltipPlacement = Pick<PopoverState, 'placement'>['placement']

export interface TooltipProps extends Overridable {
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
