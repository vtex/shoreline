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
import { Box } from '@vtex/admin-primitives'
import { Button } from '../Button'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'
import { Flex } from '@vtex/admin-primitives'

/**
 * Component to display relevant information within an admin page
 */
export const Alert = forwardRef(
  (props: AlertProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      onDismiss,
      csx,
      DefaultIcon,
      iconContainerStyles,
      responsiveFluid,
      themeKey,
      ...htmlProps
    } = useAlert(props)

    return (
      <Box ref={ref} csx={{ themeKey, ...csx }} {...htmlProps}>
        <Set
          spacing={2}
          csx={{
            alignItems: responsiveFluid ? 'flex-start' : 'center',
            marginRight: 3,
          }}
        >
          <Flex align="center" csx={iconContainerStyles}>
            {props.icon ?? <DefaultIcon />}
          </Flex>
          <Paragraph>{children}</Paragraph>
        </Set>

        {onDismiss && (
          <Button
            size="small"
            variant="adaptative-dark"
            icon={<IconClose />}
            csx={{ color: 'dark.primary' }}
            onClick={onDismiss}
          />
        )}
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
    onDismiss,
    csx = {},
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
    onDismiss,
    csx,
    ...htmlProps,
  }
}

export interface AlertProps extends SystemComponent {
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
