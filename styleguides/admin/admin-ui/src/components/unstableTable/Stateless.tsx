import React, { ReactNode, Ref, useMemo } from 'react'
import { forwardRef } from '@vtex-components/utils'
import { createElement, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox } from 'reakit/Box'

import { Column, TableDensity, TableDir } from './typings'
import {
  StylesContext,
  useStylesContext,
  CellRoleContext,
  useCellRoleContext,
} from './context'
import { Overridable } from '../../types'

export function Table(props: TableProps) {
  const {
    dir = 'ltr',
    children,
    density = 'regular',
    element = 'section',
    styleOverrides = {},
  } = props

  const styles = useMemo(() => {
    const base = `components.table.${density}`

    return {
      variants: {
        base,
        table: `${base}.table`,
        row: `${base}.row`,
        cell: `${base}.cell`,
        columnheader: `${base}.columnheader`,
      },
      dir,
    }
  }, [density, dir])

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: styles.variants.table,
  })

  return createElement({
    component: ReakitBox,
    element,
    htmlProps: { className, role: 'table', dir },
    children: (
      <StylesContext.Provider value={styles}>{children}</StylesContext.Provider>
    ),
  })
}

export const TableHead = forwardRef(function Thead(
  props: RowGroupProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'header', children, styleOverrides } = props

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
    htmlProps: { role: 'rowgroup', dir, className },
  })
})

Table.Head = TableHead

export const TableBody = forwardRef(function Thead(
  props: RowGroupProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', children, styleOverrides, ...htmlProps } = props

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

Table.Body = TableBody

const TableRow = forwardRef(function Tr(
  props: RowProps,
  ref: Ref<HTMLElement>
) {
  const { children, styleOverrides, ...htmlProps } = props

  const { variants, dir } = useStylesContext()

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `${variants.row}-${dir}`,
  })

  return createElement({
    component: ReakitBox,
    element: 'div',
    ref,
    children,
    htmlProps: { dir, className, role: 'row', ...htmlProps },
  })
})

Table.Row = TableRow

const TableCell = forwardRef(function Td<T>(
  props: CellProps<T>,
  ref: Ref<HTMLElement>
) {
  const { column, children, styleOverrides, ...htmlProps } = props

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

  return createElement({
    component: ReakitBox,
    element: 'div',
    children,
    htmlProps: { role, className, dir, ...htmlProps },
    ref,
  })
})

Table.Cell = TableCell

export interface TableProps extends Overridable {
  /**
   * layout direction
   * @default ltr
   */
  dir?: TableDir
  /**
   * Density of rows
   * @default regular
   */
  density?: TableDensity
  /**
   * Element to render
   */
  element?: string
  /**
   *
   */
  children?: ReactNode
}

export type RowProps = Overridable & {
  element?: string
  children?: ReactNode
  id?: string
  ref?: Ref<HTMLElement>
}

export type RowGroupProps = Overridable & {
  element?: string
  children?: ReactNode
  id?: string
  ref?: Ref<HTMLElement>
}

export type CellProps<T> = Overridable & {
  /**
   * Current column
   */
  column: Column<T>
  element?: string
  children?: ReactNode
  id?: string

  ref?: Ref<HTMLElement>
}
