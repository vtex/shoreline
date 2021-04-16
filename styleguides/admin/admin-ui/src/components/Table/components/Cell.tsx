import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef, useSystem } from '@vtex/admin-core'

import { Box } from '@vtex/admin-primitives'
import { Column } from '../typings'
import { useStylesContext, useCellRoleContext } from '../context'
import { SystemComponent } from '../../../types'
import { Clickable } from 'reakit/Clickable'

export const TableCell = forwardRef(function Td<T>(
  props: TableCellProps<T>,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', csx = {}, column, onClick, ...boxProps } = props

  const { variants, dir } = useStylesContext()
  const role = useCellRoleContext()
  const { cn } = useSystem()

  if (onClick) {
    return (
      <Clickable
        ref={ref}
        element={element}
        dir={dir}
        as={element}
        className={cn({
          themeKey: variants[role],
          minWidth: column.width,
          maxWidth: column.width,
          cursor: 'pointer',
          userSelect: 'none',
          ':focus:not([data-focus-visible-added])': {
            outline: 'none',
            boxShadow: 'none',
          },
          ':focus': {
            outlineColor: 'focus',
          },
        })}
        onClick={onClick}
        role={role}
        {...boxProps}
      />
    )
  }

  return (
    <Box
      ref={ref}
      element={element}
      dir={dir}
      csx={{
        themeKey: variants[role],
        minWidth: column.width,
        maxWidth: column.width,
        ...csx,
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
  /**
   * action to dispatch on click
   */
  onClick?: () => void
}
