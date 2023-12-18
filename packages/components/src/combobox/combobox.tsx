import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { ComboboxOptions } from '@ariakit/react'
import { Combobox as ComboboxInput } from '@ariakit/react'

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    return (
      <ComboboxInput
        data-sl-combobox
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...otherProps}
      />
    )
  }
)

type Options = Pick<ComboboxOptions, 'autoSelect'>

export interface ComboboxProps
  extends ComponentPropsWithoutRef<'input'>,
    Options {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
