import { get } from '@vtex/admin-ui'
import type { FormState } from '../form'

/**
 * Gets wether the field has an error
 * @param state form state
 * @param name field name
 */
export function hasError(state: FormState, name: string): boolean {
  return !!get(state, `formState.errors.${name}`, false)
}

/**
 * Gets the error text of a field
 * @param state form state
 * @param name field name
 */
export function getErrorText(
  state: FormState,
  name: string
): string | undefined {
  return get(state, `formState.errors.${name}.message`)
}
