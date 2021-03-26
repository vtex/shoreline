import React, { useEffect, useRef } from 'react'
import { Select, useSelectState, SelectProps } from '@vtex/admin-ui'
import { useField } from 'formik'

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
    error,
    errorMessage,
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

  // Verify if there is any error and show 
  const finalError = useRef<boolean>(false)
  const finalErrorMessage = useRef<string>()
  if (typeof meta.error === "object") {
    const errorCode = meta.touched && Object.values((meta.error as unknown) as Record<
      keyof typeof field.value,
      string
    >)
    finalError.current = error ?? !!errorCode
    finalErrorMessage.current = error
      ? errorMessage
      : errorCode
        ? errorCode.filter(x => x !== (null || undefined) )
          .map((value) => { 
            return value 
              && formatMessage 
                ? formatMessage(value)
                : value
          }).join(', ')
        : ''
  } else {
    const errorCode = meta.touched && meta.error
    finalError.current = error ?? !!errorCode
    finalErrorMessage.current = error
      ? errorMessage
      : errorCode
        ? formatMessage 
          ? formatMessage(errorCode)
          : errorCode
        : undefined
  }

  const selectProps = {
    ...patialSelectProps,
    errorMessage: finalErrorMessage.current,
    error: finalError.current,
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

