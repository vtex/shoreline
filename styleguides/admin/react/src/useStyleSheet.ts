import { useSystem, StyleObject } from '@vtex/admin-core'
import { isObjectEmpty, merge, omit } from '@vtex/onda-util'

export function useStyleSheet<V>(params: UseStyleSheetParams<V>) {
  const { stylesheet, sync, props, options } = params
  const { csx, className, ...htmlProps } = props
  const { cn, cx } = useSystem()

  const { variants = {}, ...preCsx } = stylesheet
  const [variantList, variantStyles] = extractVariantStyles(
    variants,
    sync,
    htmlProps
  )

  const sheetObject = merge(preCsx, variantStyles, csx)
  const finalProps = omit(htmlProps, [...variantList, ...options]) as any

  return { ...finalProps, className: cx(cn(sheetObject), className) as string }
}

/**
 * Extract styles of all variants
 * Also merge sync values
 * @param variants
 * @param sync
 * @param htmlProps
 * @example
 * // without sync
 * extractVariantStyles(
 *  {
 *    size: {
 *      small: { width: 100 },
 *      large: { width: 200 }
 *    },
 *    theme: {
 *      primary: { c: 'white', bg: 'black' },
 *      secondary: { c: 'black', bg: 'gray' }
 *    }
 *  },
 *  [],
 *  { size: 'small' theme: 'primary' }
 * )
 *
 * returns { width: 100, c: 'white', bg: 'black' }
 *
 * // with sync
 * extractVariantStyles(
 *  {
 *    size: {
 *      small: { width: 100 },
 *      large: { width: 200 }
 *    },
 *    theme: {
 *      primary: { c: 'white', bg: 'black' },
 *      secondary: { c: 'black', bg: 'gray' }
 *    }
 *  },
 *  [
 *    { size: 'small', theme: 'primary', csx: { borderStyle: 'solid' } }
 *  ],
 *  { size: 'small' theme: 'primary' }
 * )
 *
 * returns { width: 100, c: 'white', bg: 'black', borderStyle: 'solid' }
 */
export function extractVariantStyles(
  variants: Record<string, Record<string, any>>,
  sync: Sync<any>[],
  htmlProps: Record<string, any>
): [string[], Record<string, any>] {
  if (isObjectEmpty(variants)) return [[], {}]

  const list = Object.keys(variants)
  const styles = list.reduce((acc, $key) => {
    const current = (variants as any)?.[$key] ?? {}
    return merge(acc, current?.[htmlProps?.[$key]] ?? {})
  }, {})

  if (!sync || sync.length === 0) return [list, styles]

  const syncStyles = collectSyncStyles(sync, htmlProps)
  const mergedStyles = merge(styles, ...syncStyles)

  return [list, mergedStyles]
}

/**
 * Collect all styles from sync array
 * @param sync
 * @param htmlProps
 * @example
 * collectSyncStyles(
 *  [
 *    { size: 'small', icon: 'start', csx: { paddingLeft: 10 } }
 *    { size: 'small', icon: 'end', csx: { paddingRight: 10 } }
 *  ],
 *  { size: 'small', icon: 'end' }
 * )
 *
 * returns [ { paddingLeft: 10 } ]
 */
export function collectSyncStyles(
  sync: Sync<any>[],
  htmlProps: Record<string, any>
) {
  return sync.reduce((acc, currentSync) => {
    const { csx, ...variantsToSync } = currentSync

    const hasAll = Object.keys(variantsToSync).every((variant) => {
      return htmlProps?.[variant] === variantsToSync[variant]
    })

    if (!hasAll) {
      return acc
    }

    return [...acc, csx] as any
  }, [])
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
  stylesheet: StyleSheet<Variants>
  sync: Sync<any>[]
  options: string[]
  props: any
}
