import type { StyleProp } from '@vtex/admin-ui-core'
import { atom } from 'jotai'

export const isHeaderFixedAtom = atom(false)
export const isContentScrollableAtom = atom(false)

export const FIXED_HEADER_THRESHOLD = 24

export function variant(variant: string, value: string, styles: StyleProp) {
  return {
    [`[data-${variant}="${value}"]`]: styles,
  }
}

export function isElementScrollable(element: HTMLElement) {
  const hasScrollableContent = element.scrollHeight > element.offsetHeight

  return hasScrollableContent
}