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

import type { ButtonProps } from '../button'
import { Button } from '../button'
import { Inline } from '../inline'
import { Paragraph } from '../components/Paragraph'
import * as styles from './alert.style'

export const useAlert = createHook<'div', AlertOptions>((props) => {
  const { children, onDismiss, variant = 'info', action, ...htmlProps } = props

  const icon = alertIconMap[variant]

  return {
    ...htmlProps,
    baseStyle: {
      ...styles.baseline,
      ...styles.variants({
        variant,
      }),
    },
    children: (
      <Fragment>
        <Inline noWrap vSpace="unset" hSpace="$l">
          <IconContainer size="regular" csx={styles.iconContainer({ variant })}>
            {icon}
          </IconContainer>
          <Paragraph csx={styles.paragraph}>{children}</Paragraph>
        </Inline>
        <Inline noWrap vSpace="unset" hSpace="unset" csx={styles.rightInline}>
          {action && (
            <Button
              {...action}
              variant="neutralTertiary"
              bleedY
              bleedX
              csx={styles.button({ dismissible: !!onDismiss })}
            />
          )}
          {onDismiss && (
            <Button
              variant="neutralTertiary"
              icon={<IconX />}
              onClick={onDismiss}
              bleedY
              bleedX
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

export type AlertActionProps = Omit<
  WithRequiredProperty<ButtonProps, 'children' | 'onClick'>,
  'csx' | 'variant' | 'bleedX' | 'bleedY'
>

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

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}
