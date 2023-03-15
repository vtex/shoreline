import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Radio as AriakitRadio } from 'ariakit/radio'
import { cx } from '@vtex/admin-ui-core'

import { radioTheme } from './radio.css'

export const RadioButton = forwardRef(function RadioButton(
  props: RadioButtonProps,
  ref: Ref<HTMLInputElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <AriakitRadio
      {...htmlProps}
      ref={ref}
      className={cx(radioTheme, className)}
    />
  )
})

export type RadioButtonProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'value'
> & {
  /** Radio value */
  value: string | number
}
