import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import {
  IconX,
  IconXOctagon,
  IconWarning,
  IconCheckCircle,
  IconBell,
} from '@vtex/phosphor-icons'
import {
  createComponent,
  createHook,
  IconContainer,
  useElement,
} from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import { style } from '@vtex/admin-ui-core'

import type { ButtonProps } from '../button'
import { Button } from '../button'
import { Inline } from '../inline'
import { Paragraph } from '../components/Paragraph'
import * as styles from './alert.style'

export const useAlert = createHook<'div', AlertOptions>((props) => {
  const {
    children,
    onDismiss,
    visible = false,
    tone = 'info',
    action,
    ...htmlProps
  } = props

  const icon = alertIconMap[tone]
  const iconContainerCsx = style(alertIconContainerStyleMap[tone])

  return {
    ...htmlProps,
    baseStyle: {
      ...styles.baseline,
      ...styles.variants({
        visible,
        tone,
      }),
    },
    children: (
      <Fragment>
        <Inline
          csx={{
            marginRight: '$m',
          }}
          noWrap
        >
          <IconContainer size="regular" csx={iconContainerCsx}>
            {icon}
          </IconContainer>
          <Paragraph
            csx={{
              marginLeft: 3,
            }}
          >
            {children}
          </Paragraph>
        </Inline>
        <Inline>
          {action && <Button {...action} variant="neutralTertiary" bleedY />}
          {onDismiss && (
            <Button
              variant="neutralTertiary"
              icon={<IconX />}
              onClick={onDismiss}
              bleedY
            />
          )}
        </Inline>
      </Fragment>
    ),
  }
})

/**
 * Alerts are notifications of mild to high priority that inform the user about events they should know and, if it's a problem, point out a solution.
 */
export const Alert = createComponent<'div', AlertOptions>((props) => {
  const alertProps = useAlert(props)

  return useElement('div', alertProps)
})

const alertIconMap = {
  critical: <IconXOctagon weight="fill" />,
  positive: <IconCheckCircle weight="fill" />,
  warning: <IconWarning weight="fill" />,
  info: <IconBell weight="fill" />,
}

const alertIconContainerStyleMap = {
  warning: {
    color: '$warning',
  },
  positive: {
    color: '$positive',
  },
  critical: {
    color: '$critical',
  },
  info: {
    color: '$info',
  },
}

export type AlertActionProps = ButtonProps & {
  children: ButtonProps['children']
  onClick: ButtonProps['onClick']
}

export type AlertOptions = VariantProps<typeof styles.variants> & {
  /**
   * Action to take when clicking the dismiss buttton
   */
  onDismiss?: () => void
  /**
   * Alert action properties
   */
  action?: AlertActionProps
}

export type AlertProps = ComponentPropsWithRef<typeof Alert>
