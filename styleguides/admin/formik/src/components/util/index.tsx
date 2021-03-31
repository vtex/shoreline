import type { FieldMetaProps } from "formik"

export function useErrorMessage(
  currentError: boolean | undefined,
  currentErrorMessage: string | undefined,
  meta: FieldMetaProps<any>,
  formatMessage?: (errorCode: string) => string
): string | null {
  // external error
  if (currentError) return currentErrorMessage ?? null
  // formik error
  if (meta.touched && meta.error)
  {
    if (typeof meta.error === "string")
      return formatMessage ? formatMessage(meta.error) : meta.error

    const errorsList = Array.isArray(meta.error) ? meta.error : Object.values((meta.error as unknown) as Record<string, string>)
    return errorsList.filter(Boolean)
      .map((value) => { 
        return formatMessage ? formatMessage(value) : value
      }).join(', ')
  }
  return null
}
