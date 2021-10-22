import React from 'react'
import type { SelectProps } from '@vtex/admin-ui'
import { Select, useSelectState } from '@vtex/admin-ui'
import { useField } from 'formik'

import { handleErrorMessage, useSyncedState } from '../util'

export const FormikSelect = <T,>(props: FormikSelectProps<T>) => {
  const {
    name,
    items,
    label,
    error: currentError,
    errorMessage: currentErrorMessage,
    formatMessage,
    itemToString,
    onChange,
    ...selectProps
  } = props

  const [field, meta, helpers] = useField<T | null>({ name })

  const itemState = useSelectState({
    items,
    initialSelectedItem: meta.initialValue,
    itemToString:
      itemToString ||
      ((item: T | null) => {
        if (typeof item !== 'string') return ''

        return item
      }),
  })

  useSyncedState(
    itemState.selectedItem,
    itemState.selectItem,
    field.value,
    helpers.setValue,
    onChange
  )

  const errorMessage = handleErrorMessage(
    meta,
    currentError,
    currentErrorMessage,
    formatMessage
  )

  return (
    <div onClick={() => helpers.setTouched(true)}>
      <Select
        label={label}
        items={items}
        state={itemState}
        tone={errorMessage ? 'critical' : 'neutral'}
        criticalText={errorMessage ?? undefined}
        {...selectProps}
      />
    </div>
  )
}

export interface FormikSelectProps<T>
  extends Omit<SelectProps<T>, 'state' | 'criticalText' | 'tone'> {
  name: string
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
  itemToString?: (item: T | null) => string
  onChange?: (value: T | null) => void
}
