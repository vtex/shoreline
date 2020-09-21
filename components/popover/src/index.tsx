import React, { ReactNode, FunctionComponentElement, cloneElement } from 'react'
import {
  Popover as ReakitPopover,
  usePopoverState,
  PopoverDisclosure,
  PopoverProps as ReakitProps,
} from 'reakit/Popover'
import { PopoverState } from 'reakit/ts'
import { SxStyleProp, Box } from 'theme-ui'

/**
 * Elementary popover component that can be reused by all VTEX Styleguides.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a popover element by default.
 *
 * This is a styled base component, so any system can theme it.
 * You may configure your `components.popover` property of the theme object.
 * @example
 * ```jsx
 * import { Popover, usePopoverState } from '@vtex-components/popover'

 * function UseCase() {
 *   const popover = usePopoverState()
 *
 *   return (
 *     <Popover
 *       {...popover}
 *       disclosure={<button>Open popover</button>}
 *     >
 *       <p>This is a Popover</p>
 *     </Popover>
 *   )
 * }
 * ```
 */
function Popover(props: PopoverProps) {
  const {
    sx = {},
    disclosure,
    children,
    arrow,
    placement = 'top',
    visible,
    ...popoverProps
  } = props

  const popover = usePopoverState({ placement, visible })

  return (
    <>
      <PopoverDisclosure {...popover}>{disclosure}</PopoverDisclosure>
      <ReakitPopover {...popover} {...popoverProps}>
        {arrow && cloneElement(arrow, { ...popover })}
        <Box sx={sx}>{children}</Box>
      </ReakitPopover>
    </>
  )
}

type Placement = Pick<PopoverState, 'placement'>['placement']

export interface PopoverProps extends Omit<ReakitProps, 'as'> {
  /**
   * Popover content element
   */
  children: ReactNode
  /**
   * The element that triggers the popover
   */
  disclosure: ReactNode
  /**
   * Whether the popover will have an arrow or not
   */
  arrow?: FunctionComponentElement<unknown>
  /**
   * ThemeUI sx prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * The placement of the popover relative to its children
   * @default 'top'
   */
  placement?: Placement
  /**
   * Whether the popover is visible or not
   * @default false
   */
  visible?: boolean
}

export default Popover
