import type { FieldMetaProps } from 'formik'
import { useEffect } from 'react'

// Verify if there is any error and show message
export function useErrorMessage(
  currentError: boolean | undefined,
  currentErrorMessage: string | undefined,
  meta: FieldMetaProps<any>,
  formatMessage?: (errorCode: string) => string
): string | null {
  // external error
  if (currentError) return currentErrorMessage ?? null
  // formik error
  if (meta.touched && meta.error) {
    if (typeof meta.error === 'string')
      return formatMessage ? formatMessage(meta.error) : meta.error

    const errorsList = Array.isArray(meta.error)
      ? meta.error
      : Object.values((meta.error as unknown) as Record<string, string>)
    return errorsList
      .filter(Boolean)
      .map((value) => {
        return formatMessage ? formatMessage(value) : value
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
  setFieldValue: (value: any) => void
) {
  useEffect(() => {
    if (value !== fieldValue) {
      setValue(fieldValue)
    }
  }, [fieldValue]) // When forms is reset or the field is changed outside

  useEffect(() => {
    setFieldValue(value)
  }, [value]) // When the user changes the value by the component
}
