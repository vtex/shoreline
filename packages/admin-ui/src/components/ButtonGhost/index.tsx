import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import { focusVisible } from '@vtex/admin-ui-core'
import { jsx, tag } from '@vtex/admin-ui-react'
import type { ButtonOptions } from '../Button'
import { useButtonIcon } from '../Button'

import { Spinner } from '../Spinner'

export const ButtonGhost = jsx(ReakitButton)(
  {
    ...focusVisible('neutral'),
    color: 'action.neutral.ghost',
    bg: 'action.neutral.ghost',
    ':hover': {
      bg: 'action.neutral.ghostHover',
    },
    ':active': {
      bg: 'action.neutral.ghostPressed',
    },
    ':disabled': {
      bg: 'action.neutral.ghostDisabled',
      color: 'action.neutral.ghostDisabled',
    },
    fontFamily: 'sans',
    fontSettings: 'regular',
    border: 'none',
    borderRadius: 'default',
    cursor: 'pointer',
    position: 'relative',
    variants: {
      size: {
        small: {
          fontSize: 0,
          height: 32,
          width: 'auto',
          paddingLeft: 3,
          paddingRight: 3,
        },
        regular: {
          fontSize: 1,
          height: 40,
          width: 'auto',
          paddingLeft: 4,
          paddingRight: 4,
        },
      },
    },
  },
  {
    options: ['icon', 'iconPosition', 'loading'],
    useOptions(options: ButtonOptions, props) {
      const { size = 'regular', children, csx, ...restProps } = props

      const { icon, iconPosition = 'start', loading = false } = options

      const { resolvedStyles, containerStyles } = useButtonIcon({
        size,
        icon,
        iconPosition,
        children,
      })

      return {
        ...restProps,
        csx: { ...resolvedStyles, ...csx },
        size,
        children: (
          <tag.div
            csx={{
              display: 'flex',
              height: 'full',
              width: 'full',
              margin: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <tag.div
              csx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                visibility: loading ? 'hidden' : 'visible',
                ...containerStyles,
              }}
            >
              {icon} {children}
            </tag.div>
            {loading ? (
              <tag.div
                csx={{
                  position: 'absolute',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  bottom: 0,
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <Spinner color="currentColor" />
              </tag.div>
            ) : null}
          </tag.div>
        ),
      }
    },
  }
)

ButtonGhost.defaultProps = {
  size: 'regular',
}

export type ButtonGhostProps = ComponentPropsWithRef<typeof ButtonGhost> &
  ButtonOptions
