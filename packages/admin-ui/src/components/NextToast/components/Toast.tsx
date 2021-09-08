import React, { useCallback, useEffect, cloneElement } from 'react'
import {
  IconClose,
  IconErrorColorful,
  IconNotifications,
  IconSuccessColorful,
  IconWarningColorful,
} from '@vtex/admin-ui-icons'
import { tag } from '@vtex/admin-ui-react'

import { useTimeout } from '../hooks/useTimeout'
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
  info: <IconNotifications />,
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
    } = props

    const remove = useCallback(
      () => onClear(dedupeKey, id),
      [onClear, dedupeKey, id]
    )

    const { stopTimeout, startTimeout } = useTimeout({
      duration: 10000,
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
        <tag.div csx={{ display: 'flex', alignItems: 'center' }}>
          {cloneElement(icons[type], {
            csx: { marginRight: '0.75rem', color: 'blue' },
          })}
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
