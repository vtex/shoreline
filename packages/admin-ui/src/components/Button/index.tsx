import type { ReactNode, ComponentPropsWithRef } from 'react'
import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import { jsx, tag } from '@vtex/admin-ui-react'
import * as style from './Button.style'

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
    ...style.baseline,
    variants: {
      size: {
        small: style.small({ icon: 'none' }),
        regular: style.regular({ icon: 'none' }),
      },

      variant: {
        primary: style.action({
          tone: 'main',
          variant: 'primary',
        }),
        secondary: style.action({
          tone: 'main',
          variant: 'secondary',
        }),
        tertiary: style.action({
          tone: 'main',
          variant: 'tertiary',
        }),
        danger: style.action({
          tone: 'critical',
          variant: 'primary',
        }),
        'danger-secondary': style.action({
          tone: 'critical',
          variant: 'secondary',
        }),
        'danger-tertiary': style.action({
          tone: 'critical',
          variant: 'tertiary',
        }),
        'adaptative-dark': style.action({
          tone: 'neutral',
          variant: 'tertiary',
        }),
        'adaptative-light': style.action({
          tone: 'neutral',
          variant: 'tertiary',
        }),
      },
    },
  },
  {
    options: ['icon', 'iconPosition', 'loading'],
    useOptions(options: ButtonOptions, props) {
      const { size = 'regular', children, csx, ...restProps } = props
      const { icon, iconPosition = 'start', loading = false } = options

      return {
        ...restProps,
        csx: {
          svg: style.svg({ size }),
          ...style[size]({
            icon: !icon ? 'none' : !children ? 'only' : iconPosition,
          }),
          ...csx,
        },
        size,
        children: (
          <tag.div csx={style.outerContainer}>
            <tag.div
              csx={{
                ...style.innerContainer({
                  loading,
                  iconEnd: !!icon && iconPosition === 'end',
                }),
              }}
            >
              {icon} {children}
            </tag.div>
            {loading ? (
              <tag.div csx={style.spinnerContainer}>
                <Spinner color="currentColor" />
              </tag.div>
            ) : null}
          </tag.div>
        ),
      }
    },
  }
)

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
