import type { IconOptions as PhosphorOptions } from '@vtex/phosphor-icons'

import type { CsxCall } from '../src/types'

declare module '@vtex/phosphor-icons' {
  export interface IconOptions extends CsxCall {
    direction?: 'up' | 'down' | 'right' | 'left'
    title?: string
  }
}
