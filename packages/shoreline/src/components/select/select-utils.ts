import { isStringEmpty } from '@vtex/shoreline-utils'

export function isEmpty(value?: string | readonly string[]) {
  if (Array.isArray(value)) {
    return value.length === 0
  }

  return isStringEmpty(value)
}
