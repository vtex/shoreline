import type { IconOptions as PhosphorOptions } from '@vtex/phosphor-icons'

import type { CsxCall } from '../src/types'

type IconSize = 'regular' | 'small'

declare module '@vtex/phosphor-icons' {
  export interface IconOptions extends CsxCall {
    title?: string
    size?: IconSize
  }
}
