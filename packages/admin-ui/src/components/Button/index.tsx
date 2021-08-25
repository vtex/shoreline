import type { ReactNode, ComponentPropsWithRef } from 'react'
import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import type { StyleObject } from '@vtex/onda-core'
import { alpha } from '@vtex/onda-core'
import { get } from '@vtex/onda-util'
import { jsx, tag } from '@vtex/onda-react'

import { Spinner } from '../Spinner'

/**
 * Component that handles all Button variants of the DS.
 * It renders a button jsx element by default
 * @example
 * ```jsx
 * import { Button, ButtonProps } from `@vtex/admin-ui`
 * <Button>Default Button</Button>
 * ```
 */
export const Button = jsx(ReakitButton)(
  {
    fontFamily: 'sans',
    fontSettings: 'regular',
    border: 'none',
    borderRadius: 'default',
    cursor: 'pointer',
    position: 'relative',
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
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
      variant: {
        primary: {
          color: 'light.primary',
          backgroundColor: 'blue',
          ':hover': {
            backgroundColor: 'blue.hover',
          },
          ':active': {
            backgroundColor: 'blue.pressed',
          },
          ':disabled': {
            color: 'dark.primary',
            backgroundColor: 'mid.secondary',
          },
        },
        secondary: {
          backgroundColor: 'blue.secondary',
          color: 'blue',
          ':hover': {
            backgroundColor: 'blue.secondary.hover',
          },
          ':active': {
            backgroundColor: 'blue.secondary.pressed',
          },
          ':disabled': {
            color: 'mid.primary',
            backgroundColor: 'light.secondary',
          },
        },
        tertiary: {
          backgroundColor: 'transparent',
          color: 'blue',
          ':hover': {
            color: 'blue.hover',
            backgroundColor: alpha('blue.secondary.hover', 0.24),
          },
          ':active': {
            color: 'blue.pressed',
            backgroundColor: alpha('blue.secondary.pressed', 0.32),
          },
          ':disabled': {
            color: 'mid.primary',
          },
        },
        danger: {
          color: 'light.primary',
          backgroundColor: 'red',
          ':hover': {
            backgroundColor: 'red.hover',
          },
          ':active': {
            backgroundColor: 'red.pressed',
          },
          ':disabled': {
            color: 'dark.primary',
            backgroundColor: 'mid.secondary',
          },
        },
        'danger-secondary': {
          backgroundColor: 'red.secondary',
          color: 'red',
          ':hover': {
            backgroundColor: 'red.secondary.hover',
            color: 'red.hover',
          },
          ':active': {
            backgroundColor: 'red.secondary.pressed',
            color: 'red.pressed',
          },
          ':disabled': {
            color: 'mid.primary',
            backgroundColor: 'light.secondary',
          },
        },
        'danger-tertiary': {
          backgroundColor: 'transparent',
          color: 'red',
          ':hover': {
            color: 'red.hover',
            backgroundColor: alpha('red.secondary.hover', 0.24),
          },
          ':active': {
            color: 'red.pressed',
            backgroundColor: alpha('red.secondary.pressed', 0.32),
          },
          ':disabled': {
            color: 'mid.primary',
          },
        },
        'adaptative-dark': {
          color: 'currentColor',
          backgroundColor: 'transparent',
          ':hover': {
            backgroundColor: alpha('dark.primary', 0.04),
          },
          ':active': {
            backgroundColor: alpha('dark.primary', 0.08),
          },
          ':disabled': {
            color: 'mid.primary',
          },
        },
        'adaptative-light': {
          color: 'currentColor',
          backgroundColor: 'transparent',
          ':hover': {
            backgroundColor: alpha('light.primary', 0.04),
          },
          ':active': {
            backgroundColor: alpha('light.primary', 0.08),
          },
          ':disabled': {
            color: 'mid.primary',
          },
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

function useButtonIcon({
  size,
  icon,
  iconPosition,
  children,
}: {
  size: 'small' | 'regular'
  icon?: ReactNode
  iconPosition: 'start' | 'end'
  children?: ReactNode
}): Record<string, StyleObject> {
  const iconEnd = !!icon && iconPosition === 'end'
  const iconOnly = !!icon && !children

  const resolvedSize = iconOnly ? `${size}-icon-only` : ''
  const resolvedPosition = !iconOnly ? iconPosition : ''
  const svgSize = size === 'regular' ? 24 : 20

  const resolvedStyles = {
    svg: {
      size: svgSize,
      minWidth: svgSize,
      minHeight: svgSize,
      margin: 1,
    },
    ...get(
      {
        start: {
          paddingLeft: 2,
          paddingRight: 3,
        },
        end: {
          paddingLeft: 3,
          paddingRight: 2,
        },
      },
      resolvedPosition,
      {}
    ),
    ...get(
      {
        'regular-icon-only': {
          width: 40,
          paddingLeft: 1,
          paddingRight: 1,
        },
        'small-icon-only': {
          width: 32,
          paddingLeft: '2px',
          paddingRight: '2px',
        },
      },
      resolvedSize,
      {}
    ),
  }

  return {
    resolvedStyles: icon ? resolvedStyles : {},
    containerStyles: {
      flexDirection: iconEnd ? 'row-reverse' : 'row',
    },
  }
}

Button.defaultProps = {
  size: 'regular',
  variant: 'primary',
}

export interface ButtonOptions {
  /**
   *  Whether is loading
   * @default false
   */
  loading?: boolean
  /**
   * Icon of the button
   */
  icon?: ReactNode
  /**
   * Position of the icon
   * @default start
   */
  iconPosition?: 'start' | 'end'
}

export type ButtonProps = ComponentPropsWithRef<typeof Button>
