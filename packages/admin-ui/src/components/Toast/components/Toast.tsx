import React, { useCallback, useEffect } from 'react'
import {
  IconClose,
  IconErrorColorful,
  IconNotifications,
  IconSuccessColorful,
  IconWarningColorful,
} from '@vtex/admin-ui-icons'
import { tag } from '@vtex/admin-ui-react'
import { useTimeout } from '@vtex/admin-ui-hooks'

import type { InternalToast } from '../types'
import { Button } from '../../Button'
import { ToastContainer } from './ToastContainer'

interface ToastProps extends InternalToast {
  onClear: (dedupeKey: string, id: string) => void
}

const icons = {
  success: <IconSuccessColorful />,
  warning: <IconWarningColorful />,
  error: <IconErrorColorful />,
  info: <IconNotifications csx={{ color: 'blue' }} />,
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (props, ref) => {
    const {
      id,
      dedupeKey,
      message,
      onClear,
      dismissible,
      action,
      shouldRemove,
      type = 'info',
      duration = 10000,
    } = props

    const remove = useCallback(
      () => onClear(dedupeKey, id),
      [onClear, dedupeKey, id]
    )

    const { stopTimeout, startTimeout } = useTimeout({
      duration,
      onTimeout: remove,
    })

    useEffect(() => {
      if (shouldRemove) {
        stopTimeout()
        remove()
      }
    }, [shouldRemove, remove, stopTimeout])

    return (
      <ToastContainer
        role="alert"
        ref={ref}
        onMouseEnter={stopTimeout}
        onMouseLeave={startTimeout}
        type={type}
      >
        <tag.div
          csx={{
            display: 'flex',
            alignItems: 'center',
            '> *:first-child': { marginRight: '0.75rem' },
          }}
        >
          {icons[type]}
          <tag.p csx={{ textAlign: 'start', text: 'body' }}>{message}</tag.p>
        </tag.div>
        {(dismissible || action) && (
          <tag.div csx={{ display: 'flex', alignItems: 'center' }}>
            {action && (
              <Button
                key={action.label}
                onClick={() => {
                  remove()
                  action.onClick()
                }}
                csx={{ color: 'blue' }}
                variant="adaptative-dark"
              >
                {action.label}
              </Button>
            )}
            {dismissible && (
              <Button
                icon={<IconClose />}
                variant="adaptative-dark"
                size="small"
                aria-label="Close toast"
                onClick={remove}
              />
            )}
          </tag.div>
        )}
      </ToastContainer>
    )
  }
)
