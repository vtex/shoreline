import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconClose } from '@vtex/admin-ui-icons'
import type { ResponsiveValue } from '@vtex/admin-core'
import { lightness, useResponsiveValue } from '@vtex/admin-core'

import { Box, Flex } from '@vtex/admin-primitives'

import type { SystemComponent } from '../../types'
import { Button } from '../Button'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'

/**
 * Component to display relevant information within an admin page
 */
export const Alert = forwardRef(
  (props: AlertProps, ref: Ref<HTMLDivElement>) => {
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

    const colorVariant = {
      error: {
        bg: lightness('red.secondary.default', 0.94),
        borderColor: 'red.secondary',
      },
      success: {
        bg: lightness('green.secondary.default', 0.94),
        borderColor: 'green.secondary',
      },
      warning: {
        bg: lightness('yellow.secondary.default', 0.94),
        borderColor: 'yellow.secondary',
      },
      info: {
        bg: 'light.secondary',
        borderColor: 'blue.secondary',
      },
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

    return (
      <Box
        ref={ref}
        csx={{
          display: 'flex',
          alignItems: responsiveFluid ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          height: fluid ? '100%' : 48,
          paddingY: 3,
          paddingLeft: 4,
          paddingRight: sticky ? 4 : 3,
          borderRadius: sticky ? 'flat' : 'default',
          opacity: visible ? 1 : 0,
          zIndex: 999,
          transform: visible
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, -10px, 0)',
          visibility: visible ? 'visible' : 'hidden',
          transition: 'pop',
          borderStyle: 'solid',
          borderWidth: 1,
          a: {
            fontSettings: 'medium',
          },
          ...colorVariant,
          ...csx,
        }}
        {...htmlProps}
      >
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
