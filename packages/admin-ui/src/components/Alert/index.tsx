import type { ComponentPropsWithRef, ReactNode } from 'react'
import React, { Fragment } from 'react'
import { IconClose } from '@vtex/admin-ui-icons'
import { jsx } from '@vtex/admin-ui-react'

import { Flex } from '../Flex'
import { Button } from '../Button'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'

/**
 * Component to display relevant information within an admin page
 */
export const Alert = jsx('div')(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingY: 3,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 'default',
    zIndex: 999,
    transition: 'pop',
    a: {
      fontSettings: 'medium',
    },
    color: 'base',
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
            height: 48,
            '> div:first-child': {
              alignItems: 'center',
            },
          },
          '@desktop': {
            alignItems: 'center',
            height: 48,
            '> div:first-child': {
              alignItems: 'center',
            },
          },
          '@widescreen': {
            alignItems: 'center',
            height: 48,
            '> div:first-child': {
              alignItems: 'center',
            },
          },
        },
        false: {
          alignItems: 'center',
          height: 48,
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
            <Set spacing={2} csx={{ alignItems: 'flex-start', marginRight: 3 }}>
              {icon && (
                <Flex align="center" csx={iconContainerCsx}>
                  {icon}
                </Flex>
              )}
              <Paragraph>{children}</Paragraph>
            </Set>

            {onDismiss && (
              <Button
                variant="adaptative-dark"
                size="small"
                icon={<IconClose />}
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
