import type { StyleProp } from '@vtex/admin-ui-core'

export function variant(variant: string, value: string, styles: StyleProp) {
  return {
    [`[data-${variant}="${value}"]`]: styles,
  }
}
