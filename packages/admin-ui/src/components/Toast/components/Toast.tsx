import React, { useCallback, useEffect } from 'react'
import type { MouseEvent } from 'react'
import {
  IconX,
  IconXOctagon,
  IconBell,
  IconCheckCircle,
  IconWarning,
} from '@vtex/phosphor-icons'
import { useTimeout } from '@vtex/admin-ui-hooks'

import { Box } from '../../../box'
import type { InternalToast } from '../types'
import { ToastContainer } from './ToastContainer'
import { Button } from '../../../button'

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
      csx = {},
      shouldRemove,
      tone = 'info',
      duration = 10000,
      ...divProps
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
        csx={csx}
        {...divProps}
      >
        <Box
          csx={{
            display: 'flex',
            alignItems: 'center',
            '> *:first-child': { marginRight: '0.75rem' },
          }}
        >
          {icons[tone]}
          <Box as="p" csx={{ textAlign: 'start', text: '$body' }}>
            {message}
          </Box>
        </Box>
        {(dismissible || action) && (
          <Box csx={{ display: 'flex', alignItems: 'center' }}>
            {action && (
              <Button
                variant="neutralTertiary"
                key={action.label}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  remove()
                  action.onClick()
                  event.stopPropagation()
                }}
                csx={{ color: '$action.main.tertiary' }}
              >
                {action.label}
              </Button>
            )}
            {dismissible && (
              <Button
                variant="neutralTertiary"
                icon={<IconX />}
                aria-label="Close toast"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  remove()
                  event.stopPropagation()
                }}
              />
            )}
          </Box>
        )}
      </ToastContainer>
    )
  }
)
