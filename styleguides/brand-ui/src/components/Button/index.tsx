import React, { Ref } from 'react'
import { SxStyleProp } from 'theme-ui'
import BaseButton, { ButtonProps as BaseProps } from '@vtex-components/button'
import merge from 'deepmerge'
import { forwardRef } from '@vtex-components/utils'
import { get } from '@vtex-components/theme'

/**
 * Component that handles all Button variants of the DS.
 * It renders a button jsx element by default
 * @example
 * import { Button, ButtonProps } from 'brand-ui'
 * <Button>Default Button</Button>
 */
export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      size = 'regular',
      variant = 'primary',
      sx = {},
      children,
      ...restProps
    } = props

    const mergedSx = merge<SxStyleProp>(
      {
        '&:focus': {
          outline: 'none',
          boxShadow: (theme) =>
            `0px 0px 0 ${get(theme, 'space.1')}px ${get(
              theme,
              'colors.focus'
            )}`,
        },
      },
      sx
    )

    return (
      <BaseButton
        variant={variant}
        size={size}
        sx={mergedSx}
        ref={ref}
        {...restProps}
      >
        {children}
      </BaseButton>
    )
  }
)

export type Variant = 'primary' | 'secondary'
export type Size = 'small' | 'regular'
export interface ButtonProps
  extends Pick<
    BaseProps,
    | 'sx'
    | 'disabled'
    | 'focusable'
    | 'children'
    | 'id'
    | 'type'
    | 'name'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onFocus'
    | 'onMouseOver'
    | 'value'
  > {
  /** Size of the button
   * @default regular
   * */
  size?: Size
  /** Button variant
   * @default primary
   * */
  variant?: Variant
}
