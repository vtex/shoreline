import { Separator as ReakitSeparator } from 'reakit'

import { cn, jsxs } from '../../system'
import { Overridable } from '../../types'

export function Divider(props: DividerProps) {
  const dividerProps = useDivider(props)

  return jsxs({
    element: 'hr',
    component: ReakitSeparator,
    props: dividerProps,
  })
}

export function useDivider(props: DividerProps) {
  const { orientation = 'horizontal', styleOverrides, ...htmlProps } = props
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
