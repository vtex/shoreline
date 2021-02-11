import React, { ReactNode, forwardRef, Ref } from 'react'
import {
  IconWarningColorful,
  IconSuccessColorful,
  IconErrorColorful,
  IconClose,
  IconHelp,
} from '@vtex/admin-ui-icons'
import {
  inlineVariant,
  useResponsiveValue,
  ResponsiveValue,
} from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { Box } from '../Box'
import { Button, ButtonProps } from '../Button'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'
import { Flex } from '../Flex'

/**
 * Component to display relevant information within an admin page
 */
export const Alert = forwardRef(
  (props: AlertProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      actions,
      onDismiss,
      styleOverrides,
      DefaultIcon,
      iconContainerStyles,
      responsiveFluid,
      themeKey,
      ...htmlProps
    } = useAlert(props)

    return (
      <Box ref={ref} styles={styleOverrides} themeKey={themeKey} {...htmlProps}>
        <Set
          spacing={2}
          styleOverrides={{
            alignItems: responsiveFluid ? 'flex-start' : 'center',
            marginRight: 3,
          }}
        >
          <Flex align="center" styles={iconContainerStyles}>
            {props.icon ?? <DefaultIcon />}
          </Flex>
          <Paragraph>{children}</Paragraph>
        </Set>
        <Set
          spacing={3}
          styleOverrides={{
            alignItems: responsiveFluid ? 'flex-start' : 'center',
          }}
        >
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
)

export function useAlert(props: AlertProps) {
  const {
    type = 'info',
    fluid = [true, true, false],
    visible = false,
    sticky = false,
    children,
    actions,
    onDismiss,
    styleOverrides = {},
    ...htmlProps
  } = props

  const responsiveFluid = useResponsiveValue(fluid)

  const themeKey = inlineVariant(`components.alert.${type}`, [
    [visible, '-visible'],
    [responsiveFluid, '-fluid'],
    [sticky, '-sticky'],
  ])

  const DefaultIcon = {
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

  return {
    DefaultIcon,
    iconContainerStyles,
    responsiveFluid,
    themeKey,
    children,
    actions,
    onDismiss,
    styleOverrides,
    ...htmlProps,
  }
}
export interface AlertActionProps extends Pick<ButtonProps, 'onClick'> {
  label: ReactNode
}

export interface AlertProps extends SystemComponent {
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
   * Alert Icon
   */
  icon?: ReactNode
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
   * whether is sticky
   * @default false
   */
  sticky?: boolean
  /**
   * whether the height is fluid
   * @default [true, true, false]
   */
  fluid?: ResponsiveValue<boolean>
}
