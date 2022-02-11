import React, { useCallback, useEffect } from 'react'
import {
  IconX,
  IconXOctagon,
  IconBell,
  IconCheckCircle,
  IconWarning,
} from '@vtex/phosphor-icons'
import { tag } from '@vtex/admin-ui-react'
import { useTimeout } from '@vtex/admin-ui-hooks'

import type { InternalToast } from '../types'
import { ToastContainer } from './ToastContainer'
import { Button } from '../../button'

interface ToastProps extends InternalToast {
  onClear: (dedupeKey: string, id: string) => void
}

const icons = {
  positive: <IconCheckCircle weight="fill" csx={{ color: '$positive' }} />,
  warning: <IconWarning weight="fill" csx={{ color: '$warning' }} />,
  critical: <IconXOctagon weight="fill" csx={{ color: '$critical' }} />,
  info: <IconBell csx={{ color: '$info' }} />,
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
      tone = 'info',
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
        tone={tone}
      >
        <tag.div
          csx={{
            display: 'flex',
            alignItems: 'center',
            '> *:first-child': { marginRight: '0.75rem' },
          }}
        >
          {icons[tone]}
          <tag.p csx={{ textAlign: 'start', text: '$body' }}>{message}</tag.p>
        </tag.div>
        {(dismissible || action) && (
          <tag.div csx={{ display: 'flex', alignItems: 'center' }}>
            {action && (
              <Button
                variant="adaptative-dark"
                key={action.label}
                onClick={() => {
                  remove()
                  action.onClick()
                }}
                csx={{ color: '$action.main.tertiary' }}
              >
                {action.label}
              </Button>
            )}
            {dismissible && (
              <Button
                variant="adaptative-dark"
                icon={<IconX />}
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
