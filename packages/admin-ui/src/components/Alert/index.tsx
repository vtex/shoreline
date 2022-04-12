import type { ComponentPropsWithRef, ReactNode } from 'react'
import React, { Fragment } from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { jsx, IconContainer } from '@vtex/admin-ui-react'

import { Button } from '../../button'
import { Inline } from '../../inline'
import { Paragraph } from '../Paragraph'

/**
 * Component to display relevant information within an admin page
 */
export const Alert = jsx('div')(
  {
    text: '$body',
    color: '$primary',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingY: 3,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 'default',
    zIndex: 999,
    transition: 'pop',
    a: {
      text: '$action1',
    },
    variants: {
      sticky: {
        true: {
          paddingRight: 4,
          borderRadius: 'flat',
        },
        false: {
          paddingRight: 3,
          borderRadius: 'default',
        },
      },
      visible: {
        true: {
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          visibility: 'visible',
        },
        false: {
          opacity: 0,
          transform: 'translate3d(0, -10px, 0)',
          visibility: 'hidden',
        },
      },
      tone: {
        critical: {
          bg: '$critical',
          border: '$critical',
        },
        positive: {
          bg: '$positive',
          border: '$positive',
        },
        warning: {
          bg: '$warning',
          border: '$warning',
        },
        info: {
          bg: '$info',
          border: '$info',
        },
      },
      fluid: {
        true: {
          alignItems: 'flex-start',
          height: '100%',
          '@tablet': {
            alignItems: 'center',
          },
          '@desktop': {
            alignItems: 'center',
          },
          '@widescreen': {
            alignItems: 'center',
          },
        },
        false: {
          alignItems: 'center',
        },
      },
    },
  },
  {
    options: ['icon', 'onDismiss'],
    useOptions(options: AlertOptions, props) {
      const { icon, onDismiss } = options
      const { children, tone = 'info', ...htmlProps } = props

      const iconContainerCsx = {
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
      }[tone]

      return {
        ...htmlProps,
        tone,
        children: (
          <Fragment>
            <Inline
              csx={{
                marginRight: '$m',
              }}
              noWrap
            >
              {icon && (
                <IconContainer size="regular" csx={iconContainerCsx}>
                  {icon}
                </IconContainer>
              )}
              <Paragraph>{children}</Paragraph>
            </Inline>

            {onDismiss && (
              <Button
                variant="neutralTertiary"
                icon={<IconX />}
                onClick={onDismiss}
              />
            )}
          </Fragment>
        ),
      }
    },
  }
)

Alert.defaultProps = {
  tone: 'info',
  visible: false,
  sticky: false,
  fluid: true,
}

export interface AlertOptions {
  /**
   * Alert Icon
   */
  icon?: ReactNode
  /**
   * action to take on click dismiss buttton
   */
  onDismiss?: () => void
}

export type AlertProps = ComponentPropsWithRef<typeof Alert> & AlertOptions
