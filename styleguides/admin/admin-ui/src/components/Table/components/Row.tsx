import { ElementType, ReactNode, Ref } from 'react'
import { forwardRef, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit/Box'

import { createElement } from '../../../system'
import { useStylesContext } from '../context'
import { Overridable } from '../../../types'

export const TableRow = forwardRef(function Tr(
  props: TableRowProps,
  ref: Ref<HTMLElement>
) {
  const { children, styleOverrides = {}, element = 'div', ...htmlProps } = props

  const { variants, dir } = useStylesContext()

  const className = useClassName({
    ...styleOverrides,
    themeKey: `${variants.row}-${dir}`,
  })

  return createElement<Omit<BoxHTMLProps, 'ref'>>({
    component: ReakitBox,
    element,
    ref,
    children,
    htmlProps: { dir, className, role: 'row', ...htmlProps },
  })
})

export type TableRowProps = Overridable & {
  /**
   * element to be rendered
   * @default div
   */
  element?: ElementType
  /**
   * children
   */
  children?: ReactNode
  /**
   * html id
   */
  id?: string
  /**
   * row ref
   */
  ref?: Ref<HTMLElement>
}
