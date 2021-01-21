import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'

import { Box } from '../../Box'
import { Column } from '../typings'
import { useStylesContext, useCellRoleContext } from '../context'
import { Overridable } from '../../../types'

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
      themeKey={variants[role]}
      dir={dir}
      styles={{
        minWidth: column.width,
        maxWidth: column.width,
        ...styleOverrides,
      }}
      role={role}
      {...boxProps}
    />
  )
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
