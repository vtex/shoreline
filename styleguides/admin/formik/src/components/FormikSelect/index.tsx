import React from 'react'
import { Select, useSelectState, SelectProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { handleErrorMessage, useSyncedState } from '../util'

export const FormikSelect = <T extends unknown>(
  props: FormikSelectProps<T>
) => {
  const {
    name,
    items,
    label,
    error: currentError,
    errorMessage: currentErrorMessage,
    formatMessage,
    itemToString,
    ...selectProps
  } = props

  const [field, meta, helpers] = useField({ name })

  const itemState = useSelectState({
    items,
    initialSelectedItem: meta.initialValue,
    itemToString: itemToString ? itemToString : (item: any) => item,
  })

  useSyncedState(
    itemState.selectedItem,
    itemState.selectItem,
    field.value,
    helpers.setValue
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
        error={!!errorMessage}
        errorMessage={errorMessage ?? undefined}
        {...selectProps}
      />
    </div>
  )
}

export interface FormikSelectProps<T> extends Omit<SelectProps<T>, 'state'> {
  name: string
  formatMessage?: (errorCode: string) => string
  itemToString?: (item: T | null) => string
}
