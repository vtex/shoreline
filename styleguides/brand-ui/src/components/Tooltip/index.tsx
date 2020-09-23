import React from 'react'
import BaseTooltip, {
  TooltipProps as BaseProps,
} from '@vtex-components/tooltip'

export const Tooltip = ({ children, ...props }: TooltipProps) => {
  return <BaseTooltip {...props}>{children}</BaseTooltip>
}

export interface TooltipProps
  extends Pick<BaseProps, 'label' | 'children' | 'visible' | 'sx'> {
  /**
   * @default bottom
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
}
