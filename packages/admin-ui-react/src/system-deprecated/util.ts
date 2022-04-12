import { get } from '@vtex/admin-ui-util'
import type { StyleProp } from '@vtex/admin-ui-core'

import { __options, __stylesheet } from './symbols'

export function useOptionsIdentity<Options, Props>(_: Options, props: Props) {
  return props
}

/**
 * get the stylesheet from a AdminUI component
 * @param entity - any entity
 */
export function getStylesheet(entity: any): StyleProp | null {
  if (!entity) {
    return null
  }

  return get(entity, __stylesheet, null)
}

/**
 * get the options from a AdminUI component
 * @param entity - any entity
 */
export function getOptions(entity: any): string[] | null {
  if (!entity) {
    return null
  }

  return get(entity, __options, null)
}
