import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { CheckboxState as AriakitCheckboxState } from 'ariakit/checkbox'
import { Checkbox as AriakitCheckbox } from 'ariakit/checkbox'
import { cx } from '@vtex/admin-ui-core'
import { switchTheme } from './switch.style'

export const SwitchButton = forwardRef(function SwitchButton(
  props: SwitchButtonProps,
  ref: Ref<HTMLInputElement>
) {
  const { state, className = '', ...htmlProps } = props

  return (
    <AriakitCheckbox
      ref={ref}
      role="switch"
      state={state}
      className={cx(switchTheme, className)}
      {...htmlProps}
    />
  )
})

export type SwitchButtonProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value'
> & {
  state: AriakitCheckboxState
  value?: string | number
}
