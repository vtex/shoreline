import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'
import { createElement, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox } from 'reakit/Box'

import { useStylesContext, CellRoleContext } from '../context'
import { Overridable } from '../../../types'

export const TableHead = forwardRef(function Thead(
  props: TableHeadProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'header', children, styleOverrides, ...htmlProps } = props

  const { dir } = useStylesContext()
  const className = useClassName({ props: { styles: styleOverrides } })

  return createElement({
    component: ReakitBox,
    element,
    children: (
      <CellRoleContext.Provider value="columnheader">
        {children}
      </CellRoleContext.Provider>
    ),
    ref,
    htmlProps: { role: 'rowgroup', dir, className, ...htmlProps },
  })
})

export type TableHeadProps = Overridable & {
  /**
   * element to be rendered
   * @default header
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
   * head ref
   */
  ref?: Ref<HTMLElement>
}
