import React, { cloneElement } from 'react'
import {
  IconErrorColorful,
  IconNotifications,
  IconSuccessColorful,
  IconWarningColorful,
} from '@vtex/admin-ui-icons'
import { merge } from '@vtex/admin-core'
import { ToastIconProps } from './typings'
import { isElement } from 'react-is'

/**
 * Toast icon renders an icon that corresponds
 * to the toast type.
 */
export function ToastIcon(props: ToastIconProps) {
  const { type, children, ...rest } = props

  const csx = merge({ marginRight: '12px', color: 'blue' }, rest.csx)

  if (children && isElement(children)) {
    return cloneElement(children, {
      csx,
    })
  }

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
