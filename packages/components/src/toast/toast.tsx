import type { MouseEventHandler, ReactNode } from 'react'
import React from 'react'
import { toast as hotToast } from 'react-hot-toast'
import {
  IconCheckCircleFill,
  IconInfoFill,
  IconWarningCircleFill,
  IconX,
  IconXCircleFill,
} from '@vtex/shoreline-icons'
import { IconButton } from '../icon-button'

export function toast(props: ToastProps = {}) {
  const {
    variant = 'informational',
    message,
    onDismiss,
    id,
    duration,
    promise,
  } = props

  const icon = getIcon(variant)

  const renderToast = (t: any) => (
    <div data-sl-toast data-variant={variant}>
      <div data-sl-toast-message-container>
        <div data-sl-toast-icon-container>{icon}</div>
        <p data-sl-toast-text>{message}</p>
      </div>
      <div data-sl-toast-actions>
        <IconButton
          onClick={(e) => {
            onDismiss?.(e)
            hotToast.dismiss(t.id)
          }}
          label="dismiss"
          variant="tertiary"
        >
          <IconX />
        </IconButton>
      </div>
    </div>
  )

  if (promise) {
    return hotToast.promise(promise, {
      loading: 'Loading',
      success: (t) => renderToast(t),
      error: 'Error when fetching',
    })
  }

  return hotToast.custom(renderToast, {
    id,
    duration,
  })
}

type ToastVariant = 'informational' | 'success' | 'critical' | 'warning'

interface ToastProps {
  promise?: Promise<any>
  variant?: ToastVariant
  message?: ReactNode
  onDismiss?: MouseEventHandler<HTMLButtonElement>
  id?: string
  duration?: number
}

function getIcon(variant: ToastVariant = 'informational') {
  switch (variant) {
    case 'informational': {
      return <IconInfoFill />
    }

    case 'success': {
      return <IconCheckCircleFill />
    }

    case 'critical': {
      return <IconXCircleFill />
    }

    case 'warning': {
      return <IconWarningCircleFill />
    }
  }
}
