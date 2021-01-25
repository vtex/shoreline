import React, { ReactNode } from 'react'
import {
  IconWarningColorful,
  IconSuccessColorful,
  IconErrorColorful,
  IconClose,
  IconHelp,
} from '@vtex/admin-ui-icons'
import { inlineVariant } from '@vtex/admin-core'

import { Overridable } from '../../types'
import { Box } from '../Box'
import { Button, ButtonProps } from '../Button'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'
import { Flex } from '../Flex'

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
    sticky = false,
    fluid = false,
    ...boxProps
  } = props

  const Icon = {
    warning: IconWarningColorful,
    success: IconSuccessColorful,
    error: IconErrorColorful,
    info: IconHelp,
  }[type]

  const iconContainerStyles = {
    warning: {
      color: 'yellow',
    },
    success: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
    info: {
      color: 'blue',
    },
  }[type]

  const themeKey = `components.alert.${type}${inlineVariant([
    [visible, '-visible'],
    [fluid, '-fluid'],
    [sticky, '-sticky'],
  ])}`

  return (
    <Box styles={styleOverrides} themeKey={themeKey} {...boxProps}>
      <Set
        spacing={2}
        styleOverrides={{
          alignItems: fluid ? 'flex-start' : 'center',
          marginRight: 3,
        }}
      >
        <Flex align="center" styles={iconContainerStyles}>
          <Icon />
        </Flex>
        <Paragraph>{children}</Paragraph>
      </Set>
      <Set spacing={3}>
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
            styleOverrides={{ color: 'dark.primary' }}
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
   * whether is visible
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
  /**
   * whether the border is sticky
   * @default false
   */
  sticky?: boolean
  /**
   * whether the height is fluid
   * @default false
   */
  fluid?: boolean
}
