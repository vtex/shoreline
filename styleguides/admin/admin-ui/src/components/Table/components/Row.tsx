import { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'
import { createElement, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox } from 'reakit/Box'

import { useStylesContext } from '../context'
import { Overridable } from '../../../types'

export const TableRow = forwardRef(function Tr(
  props: TableRowProps,
  ref: Ref<HTMLElement>
) {
  const { children, styleOverrides = {}, element = 'div', ...htmlProps } = props

  const { variants, dir } = useStylesContext()

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `${variants.row}-${dir}`,
  })

  return createElement({
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
  element?: string
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
