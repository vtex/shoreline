import React, { Ref } from 'react'
import { Button as ThemeUIButton, SxStyleProp } from 'theme-ui'
import { Button as ReakitButton, ButtonProps as ReakitProps } from 'reakit'
import { forwardRef } from '@swell-components/utils'

/**
 * Elementary accessible button component that can be reused by all VTEX DS's.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a button element by default.
 * @example
 * import { Button, ButtonProps } from 'vtex-components/button'
 * <Button>Button text</Button>
 */
export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <ReakitButton ref={ref} {...props}>
        {(enhancedProps) => {
          return (
            <ThemeUIButton {...enhancedProps}>{props.children}</ThemeUIButton>
          )
        }}
      </ReakitButton>
    )
  }
)

export interface ButtonProps extends Omit<ReakitProps, 'as'> {
  /**
   * ThemeUI sx prop
   * @default {}
   */
  sx?: SxStyleProp
}
