import React, { ReactNode, forwardRef, Ref } from 'react'
import { IconClose } from '@vtex/admin-ui-icons'
import {
  inlineVariant,
  useResponsiveValue,
  ResponsiveValue,
} from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { Box } from '@vtex/admin-primitives'
import { Button } from '../Button'
import { Set } from '../Set'
import { Paragraph } from '@vtex/admin-components'
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
      iconContainerStyles,
      responsiveFluid,
      themeKey,
      icon,
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
          {icon && (
            <Flex align="center" csx={iconContainerStyles}>
              {icon}
            </Flex>
          )}
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
    icon,
    ...htmlProps
  } = props

  const responsiveFluid = useResponsiveValue(fluid)

  const themeKey = inlineVariant(`components.alert.${type}`, [
    [visible, '-visible'],
    [responsiveFluid, '-fluid'],
    [sticky, '-sticky'],
  ])

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
    iconContainerStyles,
    responsiveFluid,
    themeKey,
    children,
    onDismiss,
    icon,
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
