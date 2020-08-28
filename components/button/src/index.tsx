import React, { Ref } from 'react'
import { Button as ThemeUIButton, SxStyleProp } from 'theme-ui'
import { Button as ReakitButton, ButtonProps as ReakitProps } from 'reakit'
import { forwardRef } from '@vtex-components/utils'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

/**
 * Elementary accessible button component that can be reused by all VTEX DS's.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a button element by default.
 *
 * This is a styled base component, so every design system can theme it.
 * You may configure your `components.button` property of the theme object.
 *
 * @example theme
 * const theme = {
 *  colors: {
 *    primary: 'pink'
 *  }
 *  components: {
 *    button: {
 *      styles: { border: none },
 *      variant: { primary: { bg: 'primary' } },
 *      size: { small: { paddingX: 1 } }
 *    }
 *  }
 * }
 *
 * @example usage
 * import { Button, ButtonProps } from 'vtex-components/button'
 * <Button variant="primary" size="small">Small Primary Button</Button>
 */
function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { sx = {}, variant = '', size = '', ...buttonProps } = props
  const styles = useComponentSx('button', {
    variant,
    size,
  })

  return (
    <ReakitButton ref={ref} {...buttonProps}>
      {(enhancedProps) => {
        return (
          <ThemeUIButton
            sx={mergeSx<SxStyleProp>(sx, styles)}
            {...enhancedProps}
          >
            {props.children}
          </ThemeUIButton>
        )
      }}
    </ReakitButton>
  )
}

export interface ButtonProps extends Omit<ReakitProps, 'as'> {
  /**
   * ThemeUI sx prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Button variant consumed from 'components.button'
   * @default ''
   */
  variant?: string
  /**
   * Button size consumed from 'components.button'
   * @default ''
   */
  size?: string
}

export default forwardRef(Button)
