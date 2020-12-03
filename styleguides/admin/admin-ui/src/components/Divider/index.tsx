import { Separator as ReakitSeparator } from 'reakit'

import { cn, createElement } from '../../system'
import { Overridable } from '../../types'

export function Divider(props: DividerProps) {
  const dividerProps = useDivider(props)

  return createElement({
    element: 'hr',
    component: ReakitSeparator,
    htmlProps: dividerProps,
  })
}

export function useDivider(props: DividerProps) {
  const { orientation = 'horizontal', styleOverrides, ...htmlProps } = props
  const className = cn({
    text: 'headline',
    themeKey: `components.divider.${orientation}`,
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
