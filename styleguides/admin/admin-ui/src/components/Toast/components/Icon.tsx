import React from 'react'
import {
  IconErrorColorful,
  IconNotifications,
  IconSuccessColorful,
  IconWarningColorful,
} from '@vtex/admin-ui-icons'
import { merge } from '@vtex/admin-core'
import { ToastIconProps } from './typings'

/**
 * Toast icon renders an icon that corresponds
 * to the toast type.
 */
export function ToastIcon(props: ToastIconProps) {
  const { type, ...rest } = props

  const csx = merge({ marginRight: '12px' }, rest.csx)

  switch (type) {
    case 'success':
      return <IconSuccessColorful csx={csx} {...rest} />
    case 'warning':
      return <IconWarningColorful csx={csx} {...rest} />
    case 'error':
      return <IconErrorColorful csx={csx} {...rest} />
    case 'info':
    default:
      return <IconNotifications csx={csx} {...rest} />
  }
}
