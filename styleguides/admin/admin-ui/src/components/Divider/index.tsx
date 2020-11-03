import { Separator as ReakitSeparator } from 'reakit'
import { SpaceStyleProps } from '@vtex/admin-ui-theme'

import { createElement } from '../unstableThemeProvider'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export function Divider(props: DividerProps) {
  const { orientation = 'horizontal', ...htmlProps } = props
  const dividerProps = useComponent({
    props: { text: 'headline', ...htmlProps },
    themeKey: `components.divider.${orientation}`,
  })

  return createElement({
    element: 'hr',
    component: ReakitSeparator,
    htmlProps: { orientation, ...dividerProps },
  })
}

export interface DividerProps extends Overridable, SpaceStyleProps {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}
