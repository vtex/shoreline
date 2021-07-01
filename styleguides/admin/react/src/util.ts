import isPropValid from '@emotion/is-prop-valid'
import { get, pick } from '@vtex/onda-util'
import { StyleObject } from '@vtex/onda-core'
import { __options, __stylesheet } from './symbols'

export function useOptionsIdentity<Options, Props>(_: Options, props: Props) {
  return props
}

/**
 * clean invalid HTML props
 * @param props
 */
export function cleanProps<P extends {}>(props: P) {
  const validKeys = Object.keys(props).filter(isPropValid)
  const htmlProps = pick(props, validKeys)
  return htmlProps
}

export function isOndaComponent(entity: any): boolean {
  if (!entity) {
    return false
  }

  const hasStylesheet = !!getStylesheet(entity)
  const hasOptions = !!getOptions(entity)

  return hasStylesheet && hasOptions
}

export function getStylesheet(entity: any): StyleObject | null {
  if (!entity) {
    return null
  }

  return get(entity, __stylesheet, null)
}

export function getOptions(entity: any): string[] | null {
  if (!entity) {
    return null
  }

  return get(entity, __options, null)
}