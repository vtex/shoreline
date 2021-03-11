import { Separator as ReakitSeparator } from 'reakit'
import { useSystem, createComponent } from '@vtex/admin-core'

import { SystemComponent } from '../../types'

export const Divider = createComponent(ReakitSeparator, useDivider)

export function useDivider(props: DividerProps) {
  const { orientation = 'horizontal', csx, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    text: 'headline',
    themeKey: `components.divider.${orientation}`,
    ...csx,
  })

  return {
    orientation,
    className,
    ...htmlProps,
  }
}

export interface DividerProps extends SystemComponent {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}
