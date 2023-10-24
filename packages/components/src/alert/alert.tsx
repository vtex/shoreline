import {
  IconCheckCircleFill,
  IconInfoFill,
  IconWarningCircleFill,
  IconX,
  IconXCircleFill,
} from '@vtex/shoreline-icons'
import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react'
import React, { forwardRef } from 'react'

import { IconButton } from '../icon-button'
import { Button } from '../button'

/**
 * Alert indicators allow users to view semantic messages that are prominent and can be dismissable.
 * @example
 * <Alert onDismiss={() => {}}>
 *   Message
 * </Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const {
    variant = 'informational',
    children,
    onDismiss,
    action,
    ...otherProps
  } = props

  const icon = getIcon(variant)

  return (
    <div data-sl-alert data-variant={variant} ref={ref} {...otherProps}>
      <div data-sl-message-container>
        <div data-sl-alert-icon-container>{icon}</div>
        <p data-sl-alert-text>{children}</p>
      </div>
      <div data-sl-alert-actions>
        {action && <Action action={action} />}
        {onDismiss && (
          <IconButton onClick={onDismiss} label="dismiss" variant="tertiary">
            <IconX />
          </IconButton>
        )}
      </div>
    </div>
  )
})

function Action(props: ActionProps) {
  const { action } = props

  if (action.onClick) {
    const { onClick } = action

    return (
      <Button variant="tertiary" onClick={onClick}>
        {action.label}
      </Button>
    )
  }

  const { href, newTab } = action

  const newTabProps = newTab ? { target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Button variant="tertiary" asChild>
      <a href={href} {...newTabProps}>
        {action.label}
      </a>
    </Button>
  )
}

function getIcon(variant: AlertVariant = 'informational') {
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

interface ActionProps {
  action: AlertAction
}

type AlertVariant = 'informational' | 'success' | 'critical' | 'warning'

type AlertAction = {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
} & {
  label: string
  href?: string
  newTab?: boolean
}

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  variant?: AlertVariant
  onDismiss?: MouseEventHandler<HTMLButtonElement>
  action?: AlertAction
}
