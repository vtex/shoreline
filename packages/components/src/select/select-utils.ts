import { isStringEmpty } from '@vtex/shoreline-utils'

export function isEmpty(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.length === 0
  }

  return isStringEmpty(value)
}
