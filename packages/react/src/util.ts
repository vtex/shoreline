import isPropValid from '@emotion/is-prop-valid'
import { get, pick } from '@vtex/onda-util'
import type { StyleObject } from '@vtex/onda-core'

import { __options, __stylesheet } from './symbols'

export function useOptionsIdentity<Options, Props>(_: Options, props: Props) {
  return props
}

/**
 * clean invalid HTML props
 * @param props - props that can be dirty
 */
export function cleanProps<P extends {}>(props: P) {
  const validKeys = Object.keys(props).filter(isPropValid)
  const htmlProps = pick(props, validKeys)

  return htmlProps
}

/**
 * wether an entity is an onda component
 * @param entity - any entity
 */
export function isOndaComponent(entity: any): boolean {
  if (!entity) {
    return false
  }

  const hasStylesheet = !!getStylesheet(entity)
  const hasOptions = !!getOptions(entity)

  return hasStylesheet && hasOptions
}

/**
 * get the stylesheet from a onda component
 * @param entity - any entity
 */
export function getStylesheet(entity: any): StyleObject | null {
  if (!entity) {
    return null
  }

  return get(entity, __stylesheet, null)
}

/**
 * get the options from a onda component
 * @param entity - any entity
 */
export function getOptions(entity: any): string[] | null {
  if (!entity) {
    return null
  }

  return get(entity, __options, null)
}
