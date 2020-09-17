import React, { ReactNode, FunctionComponentElement, cloneElement } from 'react'
import {
  Popover as ReakitPopover,
  usePopoverState,
  PopoverDisclosure,
  PopoverProps as ReakitProps,
} from 'reakit/Popover'
import { PopoverState } from 'reakit/ts'
import { SxStyleProp, Box } from 'theme-ui'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

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

  const styles = useComponentSx('popover', {})

  const mergedSx = mergeSx<SxStyleProp>(styles, sx)

  return (
    <>
      <PopoverDisclosure {...popover}>{disclosure}</PopoverDisclosure>
      <ReakitPopover {...popover} {...popoverProps}>
        {arrow && cloneElement(arrow, { ...popover })}
        <Box sx={mergedSx}>{children}</Box>
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

export default Popover
