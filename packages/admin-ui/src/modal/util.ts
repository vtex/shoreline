import type { StyleProp } from '@vtex/admin-ui-core'
import { atom } from 'jotai'

export const isScrollingAtom = atom(false)
export const isScrollableAtom = atom(false)

export function variant(variant: string, value: string, styles: StyleProp) {
  return {
    [`[data-${variant}="${value}"]`]: styles,
  }
}

export function isElementScrollable(element: HTMLElement) {
  const hasScrollableContent = element.scrollHeight > element.offsetHeight

  return hasScrollableContent
}
