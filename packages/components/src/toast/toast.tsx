import type { MouseEventHandler, ReactNode } from 'react'
import React, { Children, isValidElement } from 'react'
import { toast as hotToast } from 'react-hot-toast/headless'
import {
  IconCheckCircleFill,
  IconInfoFill,
  IconWarningCircleFill,
  IconX,
  IconXCircleFill,
} from '@vtex/shoreline-icons'

import { Spinner } from '../spinner'
import { Bleed } from '../bleed'
import { Text } from '../text'
import type { ToastVariant } from './toast-types'
import { IconButton } from '../icon-button'
import { Button } from '../button'

/**
 * Toast component
 */
export function Toast(props: ToastProps) {
  const { id, variant = 'informational', children, loading, onDismiss } = props

  const icon = loading ? <Spinner /> : getIcon(variant)

  return (
    <div data-sl-toast data-loading={loading} data-variant={variant}>
      <div data-sl-toast-icon-container>{icon}</div>
      <div data-sl-toast-container>{renderChildren(children)}</div>
      <Bleed top="$space-2" end="$space-2" bottom="$space-2">
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
      </Bleed>
    </div>
  )
}

function renderChildren(children: ReactNode) {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return <Text variant="emphasis">{child}</Text>
    }

    if (
      isValidElement(child) &&
      (child.type === Button || child.type === IconButton)
    ) {
      return (
        <Bleed top="$space-2" bottom="$space-2" start="$space-2" end="$space-2">
          {child}
        </Bleed>
      )
    }

    return child
  })
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

interface ToastProps {
  variant?: ToastVariant
  children?: ReactNode
  onDismiss?: MouseEventHandler<HTMLButtonElement>
  id?: string
  duration?: number
  loading?: boolean
}
