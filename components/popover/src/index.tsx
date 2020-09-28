import React, { ReactNode, FunctionComponentElement, cloneElement } from 'react'
import {
  Popover as ReakitPopover,
  PopoverDisclosure,
  PopoverProps as ReakitProps,
} from 'reakit/Popover'
import { PopoverState, PopoverStateReturn } from 'reakit/ts'
import { SxStyleProp, Box } from 'theme-ui'

/**
 * Elementary popover component that can be reused by all VTEX Styleguides.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a popover element by default.
 *
 * This is a styled base component, so any system can theme it.
 * To customize this component, you just need to add the `popover` variant
 * in your theme.
 * @example
 * ```jsx
 * import { Popover, usePopoverState } from '@vtex-components/popover'

 * function UseCase({ placement, visible }) {
 *   const popover = usePopoverState({ placement, visible })
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
function Popover(props: PopoverProps & PopoverStateReturn) {
  const { sx = {}, disclosure, children, arrow, ...popoverProps } = props

  return (
    <>
      <PopoverDisclosure {...popoverProps} ref={disclosure?.ref}>
        {(referenceProps) => cloneElement(disclosure, { ...referenceProps })}
      </PopoverDisclosure>
      <ReakitPopover {...popoverProps}>
        {arrow && cloneElement(arrow, { ...popoverProps })}
        <Box variant="popover" sx={sx}>
          {children}
        </Box>
      </ReakitPopover>
    </>
  )
}

type Placement = Pick<PopoverState, 'placement'>['placement']

export interface PopoverProps extends Omit<ReakitProps, 'as' | 'baseId'> {
  /**
   * Popover content element
   */
  children: ReactNode
  /**
   * The element that triggers the popover
   */
  disclosure: FunctionComponentElement<unknown>
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
