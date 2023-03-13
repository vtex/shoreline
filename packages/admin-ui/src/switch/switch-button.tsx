import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Checkbox as AriakitCheckbox } from 'ariakit/Checkbox'
import { cx } from '@vtex/admin-ui-core'
import { switchTheme } from './switch.css'

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

export type SwitchButtonProps = ComponentPropsWithoutRef<typeof AriakitCheckbox>
