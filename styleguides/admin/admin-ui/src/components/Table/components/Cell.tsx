import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'

import { Box } from '@vtex/admin-primitives'
import { Column } from '../typings'
import { useStylesContext, useCellRoleContext } from '../context'
import { SystemComponent } from '../../../types'

export const TableCell = forwardRef(function Td<T>(
  props: TableCellProps<T>,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', styleOverrides = {}, column, ...boxProps } = props

  const { variants, dir } = useStylesContext()
  const role = useCellRoleContext()

  return (
    <Box
      ref={ref}
      element={element}
      dir={dir}
      csx={{
        themeKey: variants[role],
        minWidth: column.width,
        maxWidth: column.width,
        ...styleOverrides,
      }}
      role={role}
      {...boxProps}
    />
  )
})

export type TableCellProps<T> = SystemComponent & {
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
