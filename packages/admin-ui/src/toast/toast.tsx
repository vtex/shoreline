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

import { Box } from '../box'
import { Inline } from '../inline'
import { Button } from '../button'
import { Center } from '../center'
import type { InternalToastProps } from './types'
import { ToastContainer } from './toast-container'
import { Stack } from '../stack'
import { toastInfoTheme, toastMessageTheme } from './toast.style'

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
      variant = 'info',
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
        variant={variant}
        {...divProps}
      >
        <Inline spaceInside align="start" hSpace="$space-3">
          <Center>{icons[variant]}</Center>
          <Stack space="$space-2" className={toastInfoTheme}>
            <Box as="p" className={toastMessageTheme}>
              {message}
            </Box>
            {action && (
              <Button
                bleedX
                bleedY
                variant="neutralTertiary"
                key={action.label}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  remove()
                  action.onClick()
                  event.stopPropagation()
                }}
              >
                {action.label}
              </Button>
            )}
          </Stack>
        </Inline>
        {dismissible && (
          <Button
            bleedX
            bleedY
            variant="neutralTertiary"
            icon={<IconX />}
            aria-label="Close toast"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              remove()
              event.stopPropagation()
            }}
          />
        )}
      </ToastContainer>
    )
  }
)

interface ToastProps extends InternalToastProps {
  onClear: (dedupeKey: string, id: string) => void
}
