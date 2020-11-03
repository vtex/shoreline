import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit/Box'

import { createElement } from '../../unstableThemeProvider'
import { useStylesContext, CellRoleContext } from '../context'
import { Overridable } from '../../../types'

export const TableBody = forwardRef(function Tbody(
  props: TableBodyProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', children, styleOverrides = {}, ...htmlProps } = props

  const { dir, variants } = useStylesContext()
  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: variants.body,
  })

  return createElement<Omit<BoxHTMLProps, 'ref'>>({
    component: ReakitBox,
    element,
    children: (
      <CellRoleContext.Provider value="cell">
        {children}
      </CellRoleContext.Provider>
    ),
    ref,
    htmlProps: { role: 'rowgroup', dir, className, ...htmlProps },
  })
})

export type TableBodyProps = Overridable & {
  /**
   * Element to be rendered
   * @default div
   */
  element?: ElementType
  /**
   * children
   * should contain rows
   */
  children?: ReactNode
  /**
   * html id
   */
  id?: string
  /**
   * body ref
   */
  ref?: Ref<HTMLElement>
}
