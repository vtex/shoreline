import type { MouseEventHandler, ReactNode } from 'react'
import React from 'react'
import { toast as hotToast } from 'react-hot-toast/headless'
import {
  IconCheckCircleFill,
  IconInfoFill,
  IconWarningCircleFill,
  IconX,
  IconXCircleFill,
} from '@vtex/shoreline-icons'
import { IconButton } from '../icon-button'
import { Spinner } from '../spinner'

export function Toast(props: ToastProps) {
  const { id, variant = 'informational', message, loading, onDismiss } = props

  const icon = loading ? <Spinner /> : getIcon(variant)

  return (
    <div data-sl-toast data-loading={loading} data-variant={variant}>
      <div data-sl-toast-message-container>
        <div data-sl-toast-icon-container>{icon}</div>
        <p data-sl-toast-text>{message}</p>
      </div>
      <div data-sl-toast-actions>
        <IconButton
          onClick={(e) => {
            onDismiss?.(e)
            hotToast.dismiss(id)
          }}
          label="dismiss"
          variant="tertiary"
        >
          <IconX />
        </IconButton>
      </div>
    </div>
  )
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

type ToastVariant = 'informational' | 'success' | 'critical' | 'warning'

interface ToastProps {
  promise?: Promise<any>
  variant?: ToastVariant
  message?: ReactNode
  onDismiss?: MouseEventHandler<HTMLButtonElement>
  id?: string
  duration?: number
  loading?: boolean
}
