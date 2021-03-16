/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import BasePopover, {
  PopoverProps as BaseProps,
} from '@vtex-components/popover'
import { Box, BoxProps } from 'theme-ui'
import { PopoverArrow, usePopoverState } from 'reakit'

import { IconClose } from '../../icons/Close'
import { Button } from '../Button'

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
  showClose,
  sx = {},
  fixed = false,
  ...props
}: PopoverProps) => {
  const popover = usePopoverState({
    placement,
    visible,
    gutter: 20,
    unstable_fixed: fixed,
  })

  const handleClickClose = () => popover.hide()

  return (
    <Box sx={{ zIndex: popover.visible ? 9999 : 0 }}>
      <BasePopover
        {...props}
        {...popover}
        sx={{ ...sx, pr: showClose ? 4 : 0 }}
        unstable_autoFocusOnShow={false}
        arrow={
          variant === 'regular' ? (
            <PopoverArrow
              as={Box}
              size={25}
              variant={`popover.arrow.${popover.placement}`}
              placement={popover.placement}
            />
          ) : undefined
        }
      >
        {children}
        {showClose && (
          <Box variant="popover.close">
            <Button
              size="small"
              variant="tertiary"
              icon={() => <IconClose size={30} />}
              onClick={handleClickClose}
            />
          </Box>
        )}
      </BasePopover>
    </Box>
  )
}

Popover.Content = Content

export interface PopoverProps
  extends Pick<BaseProps, 'children' | 'disclosure' | 'sx' | 'visible'> {
  /**
   *
   * @default top
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * Show the close icon on the top-right section of the popover
   * @default false
   */
  showClose?: boolean
  /**
   * Whether the popover position must be set to fixed or not
   * @default false
   */
  fixed?: boolean
  variant?: 'regular' | 'small'
}
