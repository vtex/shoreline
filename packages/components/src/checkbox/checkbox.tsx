import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef, useState } from 'react'
import { Checkbox as BaseCheckbox } from '@ariakit/react'
import { cx } from '@vtex/shoreline-utils'
import { IconCheckSmall } from '@vtex/shoreline-icons'

import { checkboxStyle } from './checkbox.css'
import { VisuallyHidden } from '../visually-hidden'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { className, defaultChecked, children, error, ...checkboxProps } =
      props

    const [checked, setChecked] = useState(defaultChecked ?? false)
    const [focusVisible, setFocusVisible] = useState(false)

    return (
      <label
        data-sl-checkbox
        className={cx(checkboxStyle, className)}
        data-checked={checked}
        data-focus-visible={focusVisible || undefined}
        data-error={error}
      >
        <VisuallyHidden>
          <BaseCheckbox
            {...checkboxProps}
            ref={ref}
            clickOnEnter
            onFocusVisible={() => setFocusVisible(true)}
            onBlur={() => setFocusVisible(false)}
            onChange={(event) => {
              setChecked(event.target.checked)
              props.onChange?.(event)
            }}
          />
        </VisuallyHidden>
        <div data-sl-checkbox-check data-checked={checked} data-error={error}>
          <IconCheckSmall />
        </div>
        {children}
      </label>
    )
  }
)

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  children?: ReactNode
  error?: ReactNode
}
