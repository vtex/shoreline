import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'
import { createElement, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox } from 'reakit/Box'

import { useStylesContext, CellRoleContext } from '../context'
import { Overridable } from '../../../types'

export const TableBody = forwardRef(function Tbody(
  props: TableBodyProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', children, styleOverrides = {}, ...htmlProps } = props

  const { dir } = useStylesContext()
  const className = useClassName({ props: { styles: styleOverrides } })

  return createElement({
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
  element?: string
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
