import { useSystem } from '../core'
import { merge, omit } from '../system'
import { Sheet, Sync } from './types'

interface UseSheetParams<Variants> {
  sheet: Sheet<Variants>
  sync: Sync<any>[]
  ownProps: string[]
  props: any
}

/**
 * This hook handle the stylesheet priority merging
 */
export function useSheet<V>(params: UseSheetParams<V>) {
  const { sheet, sync, props, ownProps } = params
  const { csx, className, ...htmlProps } = props
  const { cn, cx } = useSystem()

  const { variants = {}, ...preCsx } = sheet

  const variantList = Object.keys(variants)

  const synced = sync.reduce((acc, s) => {
    const { csx, ...variantsToSync } = s

    const hasAll = Object.keys(variantsToSync).every((v) => {
      return htmlProps?.[v] === variantsToSync[v]
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

  return { ...finalProps, className: cx(cn(sheetObject), className) }
}
