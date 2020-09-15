import { Box, SxStyleProp } from 'theme-ui'
import React, { FunctionComponentElement, cloneElement } from 'react'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
  TooltipProps as ReakitProps,
} from 'reakit/Tooltip/'
import { useComponentSx, mergeSx } from '@vtex-components/theme'
import { PopoverState } from 'reakit/ts'

/**
 * Elementary tooltip component that can be reused by all VTEX Styleguides.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a tooltip element by default.
 * This is a styled base component, so any system can theme it.
 * You may configure your `components.tooltip` property of the theme object.
 * @example
 * ```jsx
 * import { Tooltip } from `@vtex-components/tooltip`
 *
 * const theme = {
 *  components: {
 *    tooltip: { ... }
 *  }
 * }
 *
 * <Tooltip label="Tooltip text here"><button>Children</button></Tooltip>
 * ```
 */
function Tooltip(props: TooltipProps) {
  const {
    sx = {},
    children,
    label,
    arrow,
    placement = 'top',
    visible,
    ...tooltipProps
  } = props

  const tooltip = useTooltipState({ placement, visible })

  const styles = useComponentSx('tooltip', {})
  const mergedSx = mergeSx<SxStyleProp>(styles, sx)

  return (
    <>
      <TooltipReference {...tooltip} {...children.props} ref={children.ref}>
        {(referenceProps) => cloneElement(children, { ...referenceProps })}
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...tooltipProps}>
        {arrow && cloneElement(arrow, { ...tooltip })}
        <Box sx={mergedSx}>{label}</Box>
      </ReakitTooltip>
    </>
  )
}

type Placement = Pick<PopoverState, 'placement'>['placement']

export interface TooltipProps extends Omit<ReakitProps, 'as'> {
  /**
   * The element that triggers the tooltip
   */
  children: FunctionComponentElement<unknown>
  /**
   * Text shown inside the tooltip
   */
  label: string
  /**
   * Arrow component
   * @default {}
   */
  arrow?: FunctionComponentElement<unknown>
  /**
   * ThemeUI sx prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * The placement of the tooltip relative to its children
   * @default 'top'
   */
  placement?: Placement
  /**
   * Whether the tooltip is visible or not
   * @default false
   */
  visible?: boolean
}

export default Tooltip
