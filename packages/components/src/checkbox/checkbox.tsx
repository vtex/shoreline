import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { useMergeRef } from '@vtex/shoreline-utils'
import { IconCheckSmall, IconMinusSmall } from '@vtex/shoreline-icons'

import { VisuallyHidden } from '../visually-hidden'
import { useAriaCheckbox } from './use-aria-checkbox'
import { Field, FieldLabel, FieldMessage } from '../field'
import type { AriaCheckboxProps } from './use-aria-checkbox'

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const { helpText, errorText, error, ...ariaProps } = props

    const {
      labelProps,
      inputProps,
      inputRef,
      isChecked,
      isIndeterminate,
      isFocusVisible,
      isDisabled,
    } = useAriaCheckbox(ariaProps)

    return (
      <Field>
        <label data-sl-checkbox>
          <VisuallyHidden>
            <input
              {...inputProps}
              type="checkbox"
              ref={useMergeRef(inputRef, forwardedRef)}
            />
          </VisuallyHidden>
          <div
            data-sl-checkbox-input
            data-checked={isChecked}
            data-indeterminate={isIndeterminate}
            data-disabled={isDisabled}
            data-focus-visible={isFocusVisible}
            data-error={error}
            aria-hidden="true"
          >
            {isIndeterminate && <IconMinusSmall data-sl-checkbox-check-mixed />}
            {isChecked && <IconCheckSmall data-sl-checkbox-check />}
          </div>
        </label>
        <FieldLabel {...labelProps} />
        <FieldMessage helpText={helpText} error={error} errorText={errorText} />
      </Field>
    )
  }
)

export interface CheckboxProps extends AriaCheckboxProps {
  /**
   * Label of the input
   */
  label?: ReactNode
  /**
   * Help text message
   */
  helpText?: ReactNode
  /**
   * Error text message
   */
  errorText?: ReactNode
  /**
   * Whether the field contains an error or not
   * @default false
   */
  error?: boolean
}
