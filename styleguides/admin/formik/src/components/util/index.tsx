import type { FieldMetaProps } from 'formik'
import { useEffect } from 'react'

/**
 * handleErrorMessage
 * Verify if there is any error, in formik or set by the props, and show message
 */
export function handleErrorMessage<T>(
  meta: FieldMetaProps<T>,
  currentError?: boolean,
  currentErrorMessage?: string,
  formatMessage?: (errorCode: string) => string
): string | null {
  // external error
  if (currentError) return currentErrorMessage ?? null
  // formik error
  if (meta.touched && meta.error) {
    const formattedMessage = (value: string) =>
      formatMessage ? formatMessage(value) : value

    if (typeof meta.error === 'string') return formattedMessage(meta.error)

    const errors = Array.isArray(meta.error)
      ? meta.error
      : Object.values((meta.error as unknown) as Record<string, string>)

    return errors
      .filter(Boolean)
      .map((value) => {
        return formattedMessage(value)
      })
      .join(', ')
  }
  return null
}

/**
 * useSyncedState
 * useEffects to maintain consistency between select state and value in formik
 */
export function useSyncedState(
  value: any,
  setValue: (value: any) => void,
  fieldValue: any,
  setFieldValue: (value: any) => void,
  onChange?: (value: any) => void
) {
  useEffect(() => {
    if (value !== fieldValue) {
      setValue(fieldValue)
      onChange?.(fieldValue)
    }
  }, [fieldValue]) // When forms is reset or the field is changed outside

  useEffect(() => {
    setFieldValue(value)
    onChange?.(value)
  }, [value]) // When the user changes the value by the component
}
