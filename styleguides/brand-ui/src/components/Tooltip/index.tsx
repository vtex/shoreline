import React from 'react'
import BaseTooltip, {
  TooltipProps as BaseProps,
} from '@vtex-components/tooltip'

export const Tooltip = (props: TooltipProps) => {
  const { label, children, placement, visible, sx } = props

  return (
    <BaseTooltip label={label} placement={placement} visible={visible} sx={sx}>
      {children}
    </BaseTooltip>
  )
}

export interface TooltipProps
  extends Pick<BaseProps, 'label' | 'children' | 'visible' | 'sx'> {
  /**
   * @default bottom
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
}
