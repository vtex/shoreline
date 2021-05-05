import { useSystem, StyleObject } from '@vtex/onda-core'
import { merge, omit } from '@vtex/onda-util'

export function useStyleSheet<V>(params: UseStyleSheetParams<V>) {
  const { styleSheet, sync, props, ownProps } = params
  const { csx, className, ...htmlProps } = props
  const {
    cn,
    instance: { cx },
  } = useSystem()

  const { variants = {}, ...preCsx } = styleSheet

  const variantList = Object.keys(variants)

  const synced = sync.reduce((acc, currentSync) => {
    const { csx, ...variantsToSync } = currentSync

    const hasAll = Object.keys(variantsToSync).every((variant) => {
      return htmlProps?.[variant] === variantsToSync[variant]
    })

    if (!hasAll) {
      return acc
    }

    return [...acc, csx] as any
  }, [])

  const variantStyles = variantList.reduce((acc, $key) => {
    const current = (variants as any)?.[$key] ?? {}
    return merge(acc, current?.[htmlProps?.[$key]] ?? {})
  }, {})

  const sheetObject = merge(preCsx, variantStyles, ...synced, csx)
  const finalProps = omit(htmlProps, [...variantList, ...ownProps]) as any

  return { ...finalProps, className: cx(cn(sheetObject), className) as string }
}

export interface StyleSheet<Variants> extends StyleObject {
  variants?: {
    [k in keyof Variants]: { [b in keyof Variants[k]]: StyleObject }
  }
}

export type Sync<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
} & {
  csx?: StyleObject
}

export interface UseStyleSheetParams<Variants> {
  styleSheet: StyleSheet<Variants>
  sync: Sync<any>[]
  ownProps: string[]
  props: any
}
