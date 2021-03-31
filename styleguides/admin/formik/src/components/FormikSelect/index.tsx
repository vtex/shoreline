import React, { useEffect } from 'react'
import { Select, useSelectState, SelectProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export interface FormikSelectProps<T> extends Omit<SelectProps<T>, 'state'> {
  name: string
  formatMessage?: (errorCode: string) => string
  itemToString?: (item: T | null) => string
}

export const FormikSelect = <T extends unknown>( props: FormikSelectProps<T>) => {
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
    itemToString: itemToString ? itemToString : (item) => item
  })

  // useEffects to maintain consistency between select state and value in formik
  useEffect(() => {
    if (itemState.selectedItem !== field.value) {
      itemState.selectItem(field.value)
    }
  }, [field.value]) // When forms is reset or the field is changed outside

  useEffect(() => {
    helpers.setValue(itemState.selectedItem)
  }, [itemState.selectedItem]) // When the user changes the value by the component

  // Verify if there is any error and show message
  const errorMessage = useErrorMessage(currentError,currentErrorMessage,meta,formatMessage)

  const selectProps = {
    ...patialSelectProps,
    errorMessage: errorMessage ? errorMessage : undefined,
    error: !!errorMessage,
  }

  return (
    <div onClick={()=>helpers.setTouched(true)}>
      <Select
        {...selectProps}
        label={label}
        items={items}
        state={itemState}
      />
    </div>
  )
}

