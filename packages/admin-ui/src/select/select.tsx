import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId, useFieldFocus, useForkRef } from '@vtex/admin-ui-hooks'

import type { SelectInputProps } from './select-input'
import { SelectInput } from './select-input'
import { SelectIcon } from './select-icon'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { caretTheme, containerTheme } from './select.style'

export const Select = forwardRef(function Select(
  props: SelectProps,
  ref: Ref<HTMLSelectElement>
) {
  const {
    children,
    error,
    label,
    helpText,
    errorText,
    optional = false,
    id: defaultId,
    className,
    ...selectProps
  } = props

  const id = useId(defaultId)
  const [focusRef, ensureFocus] = useFieldFocus<HTMLSelectElement>()

  return (
    <FormControl className={className}>
      {label ? (
        <FormControlLabel optional={optional} htmlFor={id}>
          {label}
        </FormControlLabel>
      ) : null}
      <div onClick={ensureFocus} className={containerTheme}>
        <SelectInput
          id={id}
          ref={useForkRef(focusRef, ref)}
          error={error}
          {...selectProps}
        >
          {children}
        </SelectInput>
        <div className={caretTheme}>
          <SelectIcon />
        </div>
      </div>
      <FormControlMessage
        error={error}
        helpText={helpText}
        errorText={errorText}
      />
    </FormControl>
  )
})

export interface SelectOptions {
  label?: ReactNode
  helpText?: ReactNode
  errorText?: ReactNode
  optional?: boolean
}

export type SelectProps = SelectOptions &
  Omit<SelectInputProps, keyof SelectOptions>
