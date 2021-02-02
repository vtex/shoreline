import { Separator as ReakitSeparator } from 'reakit'
import { useSystem, createComponent } from '@vtex/admin-core'

import { Overridable } from '../../types'

export const Divider = createComponent(ReakitSeparator, useDivider)

export function useDivider(props: DividerProps) {
  const { orientation = 'horizontal', styleOverrides, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    text: 'headline',
    themeKey: `components.divider.${orientation}`,
    ...styleOverrides,
  })

  return {
    orientation,
    className,
    ...htmlProps,
  }
}

export interface DividerProps extends Overridable {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}
