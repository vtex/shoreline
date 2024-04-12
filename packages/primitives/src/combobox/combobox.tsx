import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { ComboboxOptions as AriakitComboboxOptions } from '@ariakit/react'
import { Combobox } from '@ariakit/react'

/**
 * Renders a combobox input
 */
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

export interface ComboboxInputOptions
  extends Pick<AriakitComboboxOptions, 'autoSelect'> {
  /**
   * Enable children composition
   * @default false
   */
  asChild?: boolean
}

export type ComboboxInputProps = ComboboxInputOptions &
  ComponentPropsWithoutRef<'input'>
