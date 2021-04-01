import React from 'react'
import { Select, useSelectState, SelectProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage, useSyncedState } from '../util'

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
    ...patialSelectProps
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

  const errorMessage = useErrorMessage(
    currentError,
    currentErrorMessage,
    meta,
    formatMessage
  )

  const selectProps = {
    ...patialSelectProps,
    errorMessage: errorMessage ? errorMessage : undefined,
    error: !!errorMessage,
  }

  return (
    <div onClick={() => helpers.setTouched(true)}>
      <Select {...selectProps} label={label} items={items} state={itemState} />
    </div>
  )
}

export interface FormikSelectProps<T> extends Omit<SelectProps<T>, 'state'> {
  name: string
  formatMessage?: (errorCode: string) => string
  itemToString?: (item: T | null) => string
}
