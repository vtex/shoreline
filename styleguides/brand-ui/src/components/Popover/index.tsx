import React from 'react'
import BasePopover, {
  PopoverProps as BaseProps,
} from '@vtex-components/popover'
import { Box, BoxProps } from 'theme-ui'
import { PopoverArrow, usePopoverState } from 'reakit'

const Content = ({ children, ...props }: BoxProps) => (
  <Box {...props} variant="popover.content">
    {children}
  </Box>
)

export const Popover = ({
  children,
  placement = 'top',
  visible = false,
  variant = 'regular',
  ...props
}: PopoverProps) => {
  const popover = usePopoverState({ placement, visible })

  return (
    <BasePopover
      {...props}
      {...popover}
      arrow={
        variant === 'regular' ? (
          <PopoverArrow
            as={Box}
            size={25}
            variant={`popover.arrow.${placement}`}
            placement={placement}
          />
        ) : (
            undefined
          )
      }
    >
      {children}
    </BasePopover>
  )
}

Popover.Content = Content

export interface PopoverProps
  extends Pick<BaseProps, 'children' | 'disclosure' | 'sx' | 'visible'> {
  /**
   * @default top
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  variant?: 'regular' | 'small'
}
