import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'
import type { StyleProp } from '@vtex/admin-ui-core'

import type { SelectInputOptions } from './select-input'
import { SelectInput, SelectInputContainer } from './select-input'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'

export const Select = forwardRef(
  (props: SelectProps, ref: Ref<HTMLSelectElement>) => {
    const {
      children,
      error,
      label,
      helpText,
      errorText,
      optional = false,
      id: defaultId,
      csx,
      ...selectProps
    } = props

    const id = useId(defaultId)

    return (
      <FormControl error={error} optional={optional} csx={csx}>
        {label ? (
          <FormControlLabel htmlFor={id}>{label}</FormControlLabel>
        ) : null}
        <SelectInputContainer>
          <SelectInput id={id} ref={ref} error={error} {...selectProps}>
            {children}
          </SelectInput>
        </SelectInputContainer>
        <FormControlMessage helpText={helpText} errorText={errorText} />
      </FormControl>
    )
  }
)

type JSXSelectProps = ComponentPropsWithoutRef<'select'>

export interface SelectOptions extends Omit<SelectInputOptions, 'variant'> {
  label?: ReactNode
  csx?: StyleProp
  helpText?: ReactNode
  errorText?: ReactNode
  optional?: boolean
}

export type SelectProps = SelectOptions &
  Omit<JSXSelectProps, keyof SelectOptions>
