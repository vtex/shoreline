import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef, useEffect, useRef } from 'react'
import {
  Checkbox as BaseCheckbox,
  CheckboxProvider,
  useCheckboxContext,
} from '@ariakit/react'
import { cx, useForkRef } from '@vtex/shoreline-utils'

import { checkboxStyle } from './checkbox.css'
import { Text } from '../text'
import { useControllableState } from './use-controllable'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const {
      className,
      defaultChecked,
      children,
      error = false,
      checked,
      ...checkboxProps
    } = props

    const [value, setValue] = useControllableState<boolean | string>({
      value: checked,
      defaultValue: defaultChecked,
    })

    const context = useCheckboxContext()

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = value === 'indeterminate'
      }
    }, [value])

    return (
      <label
        data-sl-checkbox
        className={cx(checkboxStyle, className)}
        data-checked={checked}
        data-error={error}
      >
        <CheckboxProvider
          value={value}
          setValue={setValue as any}
          store={context}
        >
          <BaseCheckbox
            {...checkboxProps}
            data-sl-checkbox-input
            ref={useForkRef(ref, forwardedRef)}
          />
        </CheckboxProvider>
        <Text>{children}</Text>
      </label>
    )
  }
)

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'checked'> {
  children?: ReactNode
  /**
   * @default false
   */
  error?: ReactNode
  /**
   */
  checked?: boolean | 'indeterminate'
}
