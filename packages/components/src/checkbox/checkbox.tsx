import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef, useRef } from 'react'
import { useToggleState } from '@react-stately/toggle'
import { useCheckbox } from '@react-aria/checkbox'
import { IconCheckSmall, IconMinusSmall } from '@vtex/shoreline-icons'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@vtex/shoreline-utils'

import { VisuallyHidden } from '../visually-hidden'
import { useForkRef } from './use-fork-ref'
import { Field, FieldLabel, FieldMessage } from '../field'
import { useId } from './use-id'

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const {
      id: defaultId,
      disabled,
      onChange,
      indeterminate,
      required,
      defaultChecked,
      checked,
      helpText,
      errorText,
      error,
      ...rest
    } = props

    const id = useId(defaultId)

    const state = useToggleState({
      onChange,
      isSelected: checked,
      defaultSelected: defaultChecked,
      isDisabled: disabled,
      isRequired: required,
    })

    const innerRef = useRef<HTMLInputElement>(null)
    const { inputProps } = useCheckbox(
      { id, isIndeterminate: indeterminate, isDisabled: disabled, onChange },
      state,
      innerRef
    )

    const { isFocusVisible, focusProps } = useFocusRing()

    const ref = useForkRef(innerRef, forwardedRef)

    const isSelected = state.isSelected && !indeterminate

    return (
      <Field>
        <label data-sl-checkbox>
          <VisuallyHidden>
            <input
              {...mergeProps(inputProps, focusProps)}
              {...rest}
              ref={ref}
            />
          </VisuallyHidden>
          <div
            data-sl-checkbox-input
            data-checked={isSelected}
            data-indeterminate={indeterminate}
            data-disabled={inputProps.disabled}
            data-focus-visible={isFocusVisible}
            data-error={error}
            aria-hidden="true"
          >
            {indeterminate && <IconMinusSmall />}
            {isSelected && <IconCheckSmall />}
          </div>
        </label>
        <FieldLabel htmlFor={inputProps.id}>{props.label}</FieldLabel>
        <FieldMessage helpText={helpText} error={error} errorText={errorText} />
      </Field>
    )
  }
)

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  onChange?: (checked: boolean) => void
  value?: string
  label?: ReactNode
  indeterminate?: boolean
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
