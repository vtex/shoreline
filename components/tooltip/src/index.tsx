/** @jsx jsx */
import { jsx, Box, SxStyleProp } from 'theme-ui'
import { FunctionComponentElement, Fragment, cloneElement } from 'react'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
  TooltipProps as ReakitProps,
} from 'reakit/Tooltip/'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

export type Placement =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start'

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
    placement,
    visible,
    ...tooltipProps
  } = props

  const tooltip = useTooltipState({ placement: placement ?? 'top', visible })

  const styles = useComponentSx('tooltip', {})

  return (
    <Fragment>
      <TooltipReference {...tooltip} {...children.props} ref={children.ref}>
        {(referenceProps) => cloneElement(children, { ...referenceProps })}
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...tooltipProps}>
        {arrow && cloneElement(arrow, { ...tooltip })}
        <Box sx={mergeSx<SxStyleProp>(styles, sx)}>{label}</Box>
      </ReakitTooltip>
    </Fragment>
  )
}

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
   * The size of the arrow, if the arrow is enabled
   * @default The reakit default size
   */
  placement?: Placement
  /**
   * Whether the tooltip is visible or not
   * @default false
   */
  visible?: boolean
}

export default Tooltip
