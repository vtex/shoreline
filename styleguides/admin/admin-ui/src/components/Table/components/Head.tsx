import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'
import { useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit/Box'

import { createElement } from '../../unstableThemeProvider'
import { useStylesContext, CellRoleContext } from '../context'
import { Overridable } from '../../../types'

export const TableHead = forwardRef(function Thead(
  props: TableHeadProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'header', children, styleOverrides, ...htmlProps } = props

  const { dir, variants } = useStylesContext()
  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: variants.header,
  })

  return createElement<Omit<BoxHTMLProps, 'ref'>>({
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
   * head ref
   */
  ref?: Ref<HTMLElement>
}
