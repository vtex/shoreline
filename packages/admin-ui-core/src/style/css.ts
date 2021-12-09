import type { StyleProp } from '../runtime'
import { get } from '@vtex/admin-ui-util'

export function css(csx: StyleProp): StyleProp {
  return csx
}

export function variant<V extends {}>(variants: VariantDef<V>) {
  return function variantFn(rules: VariantsCall<V>) {
    const style: StyleProp = {}

    for (const key in rules) {
      Object.assign(style, get(variants, `${key}.${rules[key]}`, {}))
    }

    return css(style)
  }
}

export type VariantDef<V> = {
  [k in keyof V]: { [b in keyof V[k]]: StyleProp }
}

export type InferVariant<T> = T extends 'true'
  ? boolean
  : T extends 'false'
  ? boolean
  : T

export type VariantsCall<V extends {}> = {
  [k in keyof V]?: InferVariant<keyof V[k]>
}
