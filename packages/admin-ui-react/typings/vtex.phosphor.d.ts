import type { IconOptions as PhosphorOptions } from '@vtex/phosphor-icons'

import type { ComponentStyleProps } from '../src/system'

type IconSize = 'regular' | 'small'

declare module '@vtex/phosphor-icons' {
  export interface IconOptions extends ComponentStyleProps {
    title?: string
    size?: IconSize
  }
}
