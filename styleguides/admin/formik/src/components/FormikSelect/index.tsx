import React, { useEffect } from 'react'
import { Select, useSelectState, SelectProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikSelectProps<T> extends Omit<SelectProps<T>, 'state'> {
  name: string
  formatMessage?: (errorCode: string) => string
}

export const FormikSelect = <T extends unknown>({
  name,
  items,
  label,
  error,
  errorMessage,
  formatMessage,
  ...props
}: FormikSelectProps<T>) => {

  const [field, meta, helpers] = useField({ name })

  const itemState = useSelectState({
    items,
    initialSelectedItem: meta.initialValue,
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
  const errorCode = meta.touched && meta.error
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
      ? formatMessage 
        ? formatMessage(errorCode)
        : errorCode
      : undefined

  const inputProps = {
    ...props,
    errorMessage: finalErrorMessage,
    error: finalError,
  }

  return (
    <div onClick={()=>helpers.setTouched(true)}>
      <Select
        {...inputProps}
        label={label}
        items={items}
        state={itemState}
      />
    </div>
  )
}

