import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import {
  IconX,
  IconXOctagon,
  IconWarning,
  IconCheckCircle,
  IconBell,
} from '@vtex/phosphor-icons'
import { cx } from '@vtex/admin-ui-core'
import type { WithRequiredProps } from '@vtex/admin-ui-util'

import { IconContainer } from '../icons'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import { Inline } from '../inline'
import { Paragraph } from '../paragraph'
import { Stack } from '../stack'
import {
  alertTheme,
  alertActionTheme,
  rightInline,
  alertDescription,
} from './alert.style'

/**
 * Alerts are notifications of mild to high priority that inform the user about events they should know and, if it's a problem, point out a solution.
 *
 * @example
 * <Alert variant="positive">Here goes your description</Alert>
 */
export const Alert = forwardRef(function Alert(
  props: AlertProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    children,
    onDismiss,
    variant = 'info',
    action,
    className = '',
    ...htmlProps
  } = props

  const icon = alertIconMap[variant]

  return (
    <div
      ref={ref}
      className={cx(alertTheme, className)}
      data-variant={variant}
      {...htmlProps}
    >
      <Inline noWrap vSpace="unset" hSpace="$space-3" spaceInside>
        <IconContainer size="regular">{icon}</IconContainer>
        <Paragraph className={alertDescription}>{children}</Paragraph>
      </Inline>
      <Stack direction="row" space="$space-2" className={rightInline}>
        {action ? (
          <Button
            {...action}
            variant="neutralTertiary"
            bleedY
            bleedX
            data-dismissible={!!onDismiss}
            className={alertActionTheme}
          />
        ) : null}
        {onDismiss ? (
          <Button
            variant="neutralTertiary"
            icon={<IconX />}
            onClick={onDismiss}
            bleedY
            bleedX
          />
        ) : null}
      </Stack>
    </div>
  )
})

Alert.displayName = 'Alert'

const alertIconMap = {
  critical: <IconXOctagon weight="fill" />,
  positive: <IconCheckCircle weight="fill" />,
  warning: <IconWarning weight="fill" />,
  info: <IconBell weight="fill" />,
}

export type AlertActionProps = Omit<
  WithRequiredProps<ButtonProps, 'children' | 'onClick'>,
  'csx' | 'variant' | 'bleedX' | 'bleedY'
>

export type AlertVariants = 'positive' | 'critical' | 'warning' | 'info'

export type AlertOptions = AlertVariants & {}

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  variant?: AlertVariants
  /**
   * Action to take when clicking the dismiss buttton
   */
  onDismiss?: () => void
  /**
   * Alert action properties
   */
  action?: AlertActionProps
}
