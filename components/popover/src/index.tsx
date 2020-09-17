import React, { ReactNode } from 'react'
import {
  Popover as ReakitPopover,
  usePopoverState,
  PopoverArrow,
  PopoverDisclosure,
  PopoverProps as ReakitProps,
} from 'reakit/Popover'
import { PopoverState } from 'reakit/ts'
import { SxStyleProp } from 'theme-ui'

function Popover(props: PopoverProps) {
  const { } = props
}

type Placement = Pick<PopoverState, 'placement'>['placement']
type PopoverSize = 'small' | 'regular'

export interface PopoverProps extends Omit<ReakitProps, 'as'> {
  /**
   * The element that triggers the popover
   */
  children: ReactNode
  /**
   * Sizing of the popover
   */
  size?: PopoverSize
  disclosure?: ReactNode
  arrow?: ReactNode
  sx?: SxStyleProp
  placement?: Placement
  visible?: boolean
}
