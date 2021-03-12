import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Select, useSelectState, SelectProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikSelectProps<T> extends Omit<SelectProps<T>, 'state'> {
  name: string
}

export const FormikSelect = <T extends unknown>({
  name,
  items,
  label,
  error,
  errorMessage,
  ...props
}: FormikSelectProps<T>) => {
  const { formatMessage } = useIntl()

  const [field, meta, helpers] = useField({ name })

  const itemState = useSelectState({
    items,
    initialSelectedItem: meta.initialValue,
  })

  // useEffects to maintain consistency between select state and value in formik
  useEffect(() => {
    itemState.selectItem(meta.initialValue)
  }, [meta.initialValue]) // When initial value is changed

  useEffect(() => {
    itemState.selectItem(field.value)
  }, [field.value]) // When forms is reset

  useEffect(() => {
    helpers.setValue(itemState.selectedItem)
    helpers.setTouched(true)
  }, [itemState.selectedItem]) // When the user changes the value

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
    ? formatMessage({ id: errorCode })
    : undefined
  const finalError = error ?? !!errorCode

  const inputProps = {
    ...props,
    errorMessage: finalErrorMessage,
    error: finalError,
  }

  return (
    <Select
      {...inputProps}
      label={label}
      items={items}
      state={itemState}
    />
  )
}

