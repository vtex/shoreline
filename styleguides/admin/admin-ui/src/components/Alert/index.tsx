/* eslint-disable react/jsx-handler-names */
import React, { ReactNode } from 'react'

import {
  IconWarning,
  IconSuccess,
  IconError,
  IconClose,
  IconHelp,
} from '../../icons'
import { Overridable } from '../../types'
import { Box } from '../Box'
import { Button, ButtonProps } from '../Button'
import { Heading } from '../Heading'
import { Set } from '../Set'

/**
 * Component to display relevant information within an admin page
 */
export function Alert(props: AlertProps) {
  const {
    type = 'info',
    children,
    actions,
    onDismiss,
    styleOverrides = {},
    visible = false,
    ...boxProps
  } = props

  const Icon = {
    warning: IconWarning,
    success: IconSuccess,
    error: IconError,
    info: IconHelp,
  }[type]

  const iconContainerStyles = {
    warning: {
      color: 'warning.base',
    },
    success: {
      color: 'success.base',
    },
    error: {
      color: 'danger.base',
    },
    info: {
      color: 'primary.base',
    },
  }[type]

  return (
    <Box
      styles={styleOverrides}
      themeKey={`components.alert.${type}${visible ? '-visible' : ''}`}
      {...boxProps}
    >
      <Set spacing={2}>
        <Box
          styles={{
            ...iconContainerStyles,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon />
        </Box>
        <Heading text="body">{children}</Heading>
      </Set>
      <Set spacing={2} styleOverrides={{ color: 'text.primary' }}>
        {actions?.tertiary && (
          <Button
            size="small"
            variant="tertiary"
            onClick={actions.tertiary.onClick}
          >
            {actions.tertiary?.label}
          </Button>
        )}
        {actions?.secondary && (
          <Button
            size="small"
            variant="secondary"
            onClick={actions.secondary.onClick}
          >
            {actions.secondary?.label}
          </Button>
        )}
        {actions?.primary && (
          <Button size="small" onClick={actions.primary.onClick}>
            {actions.primary?.label}
          </Button>
        )}
        {onDismiss && (
          <Button
            size="small"
            variant="adaptative-dark"
            icon={<IconClose />}
            onClick={onDismiss}
          />
        )}
      </Set>
    </Box>
  )
}

export interface AlertActionProps extends Pick<ButtonProps, 'onClick'> {
  label: ReactNode
}

export interface AlertProps extends Overridable {
  /**
   * possible actions
   */
  actions?: {
    /**
     * primary action
     */
    primary?: AlertActionProps
    /**
     * secondary action
     */
    secondary?: AlertActionProps
    /**
     * tertiary action
     */
    tertiary?: AlertActionProps
  }
  /**
   * action to take on click dismiss buttton
   */
  onDismiss?: () => void
  /**
   * wheather is visible
   * @default false
   */
  visible?: boolean
  /**
   * alert type
   * @default warning
   */
  type?: 'error' | 'success' | 'warning' | 'info'
  /**
   * alert children
   */
  children?: ReactNode
}
