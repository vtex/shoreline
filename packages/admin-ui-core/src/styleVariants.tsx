import { get } from '@vtex/admin-ui-util'

import type { StyleProp } from './types'

export function style(csx: StyleProp): StyleProp {
  return csx
}

export function styleVariants<V extends {}>(variants: VariantDef<V>) {
  return function variantFn(rules: VariantsCall<V>) {
    const css: StyleProp = {}

    for (const key in rules) {
      Object.assign(css, get(variants, `${key}.${rules[key]}`, {}))
    }

    return style(css)
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

/**
 * Get variant parameters as props
 * @example
 * const variants = styleVariants({})
 * type Props = VariantProps<typeof variants>
 */
export type VariantProps<V extends (args: any) => any> = Parameters<V>[0]

/**
 * Enhance component props with variants
 * @example
 * interface Props {}
 * const variants = styleVariants({})
 * type ComponentProps = PropsWithVariants<Props, typeof variants>
 */
export type PropsWithVariants<P extends {}, V extends (args: any) => any> = P &
  VariantProps<V>
