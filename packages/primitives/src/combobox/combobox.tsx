import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { ComboboxOptions } from '@ariakit/react'
import { Combobox } from '@ariakit/react'

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(props, ref) {
    const { asChild = false, children, ...domProps } = props

    return (
      <Combobox
        data-sl-combobox-input
        ref={ref}
        render={asChild ? (children as JSX.Element) : undefined}
        {...domProps}
      />
    )
  }
)

type Options = Pick<ComboboxOptions, 'autoSelect'>

export interface ComboboxInputProps
  extends ComponentPropsWithoutRef<'input'>,
    Options {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}
