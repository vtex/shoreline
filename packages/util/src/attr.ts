import type { LooseBoolean } from './types'

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? '' : undefined) as LooseBoolean

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined
