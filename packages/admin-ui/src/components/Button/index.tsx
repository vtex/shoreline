import type { ReactNode, ComponentPropsWithRef } from 'react'
import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import type { StyleObject } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'
import { jsx, tag } from '@vtex/admin-ui-react'

import { Spinner } from '../Spinner'

export type ActionTone = 'main' | 'critical'
export type ActionVariant = 'solid' | 'soft' | 'text'

function actionSync(tone: ActionTone, variant: ActionVariant) {
  return {
    tone,
    variant,
    csx: {
      color: `action.${tone}.${variant}`,
      bg: `action.${tone}.${variant}`,
      ':hover': {
        bg: `action.${tone}.${variant}Hover`,
      },
      ':active': {
        bg: `action.${tone}.${variant}Pressed`,
      },
      ':disabled': {
        bg: `action.${tone}.${variant}Disabled`,
        color: `action.${tone}.${variant}Disabled`,
      },
    },
  }
}

// const variant = {
//   'adaptative-dark': {
//     color: 'currentColor',
//     bg: 'transparent',
//     ':hover': {
//       bg: alpha('black' as any, 0.04), // TODO: Check if we can add this token!
//     },
//     ':active': {
//       bg: alpha('black' as any, 0.08),
//     },
//     ...focusVisible('base'),
//   },
//   'adaptative-light': {
//     color: 'currentColor',
//     bg: 'transparent',
//     ':hover': {
//       bg: alpha('white' as any, 0.04),
//     },
//     ':active': {
//       bg: alpha('white' as any, 0.08),
//     },
//     ...focusVisible('base'),
//   },
// }

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
      tone: {
        main: focusVisible('main'),
        critical: focusVisible('critical'),
      },
      variant: {
        solid: {},
        soft: {},
        text: {},
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
    sync: [
      actionSync('main', 'solid'),
      actionSync('main', 'soft'),
      actionSync('main', 'text'),
      actionSync('critical', 'solid'),
      actionSync('critical', 'soft'),
      actionSync('critical', 'text'),
    ],
  }
)

export function useButtonIcon({
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
  tone: 'main',
  variant: 'solid',
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
