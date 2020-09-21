/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import { Button as ReakitButton, ButtonProps as ReakitProps } from 'reakit'
import { forwardRef } from '@vtex-components/utils'

/**
 * Elementary accessible button component that can be reused by all VTEX Styleguides.
 * You can use reakit full features and theme-ui's sx.
 * It renders a button element by default.
 * This is a styled base component, so any system can theme it.
 * You may configure your `buttons` property of the theme object.
 * @example
 * ```jsx
 * import { Button, ButtonProps } from `@vtex-components/button`
 *
 * const theme = {
 *  colors: {
 *    primary: 'pink'
 *  }
 *  buttons: {
 *    'primary-regular': { bg: 'primary', px: 2 },
 *    'primary-small': { bg: 'primary', px: 1 },
 *  }
 * }
 *
 * <Button variant="primary-small">Small Primary Button</Button>
 * ```
 */
function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { sx = {}, variant = '', ...buttonProps } = props

  return (
    <ReakitButton
      ref={ref}
      {...buttonProps}
      sx={{ variant: `buttons.${variant}`, ...sx }}
    />
  )
}

export interface ButtonProps extends Omit<ReakitProps, 'as'> {
  /**
   * ThemeUI sx prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Button variant consumed from 'buttons'
   * @default ''
   */
  variant?: string
  size?: string
}

export default forwardRef(Button)
