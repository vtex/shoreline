import { ElementType, ReactNode, Ref } from 'react'
import { forwardRef, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit/Box'

import { createElement } from '../../../system'
import { Column } from '../typings'
import { useStylesContext, useCellRoleContext } from '../context'
import { Overridable } from '../../../types'

export const TableCell = forwardRef(function Td<T>(
  props: TableCellProps<T>,
  ref: Ref<HTMLElement>
) {
  const {
    element = 'div',
    styleOverrides = {},
    column,
    children,
    ...htmlProps
  } = props

  const { variants, dir } = useStylesContext()
  const role = useCellRoleContext()

  const className = useClassName({
    props: {
      styles: {
        minWidth: column.width,
        maxWidth: column.width,
        ...styleOverrides,
      },
    },
    themeKey: variants[role],
  })

  return createElement<Omit<BoxHTMLProps, 'ref'>>({
    component: ReakitBox,
    element,
    children,
    htmlProps: { role, className, dir, ...htmlProps },
    ref,
  })
})

export type TableCellProps<T> = Overridable & {
  /**
   * Current column
   */
  column: Column<T>
  /**
   * elements to be rendered
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
   * cell ref
   */
  ref?: Ref<HTMLElement>
}
