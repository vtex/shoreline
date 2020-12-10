import React, { ElementType, ReactNode, useMemo } from 'react'
import { useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox } from 'reakit/Box'

import { createElement } from '../../../system'
import { TableDensity, TableDir } from '../typings'
import { StylesContext } from '../context'
import { Overridable } from '../../../types'
import { TableHead } from './Head'
import { TableBody } from './Body'
import { TableRow } from './Row'
import { TableCell } from './Cell'

export function Table(props: TableProps) {
  const {
    dir = 'ltr',
    children,
    density = 'regular',
    element = 'div',
    styleOverrides = {},
  } = props

  const styles = useMemo(() => {
    const base = `components.table.${density}`

    return {
      variants: {
        base,
        table: `${base}.table`,
        header: `${base}.header`,
        body: `${base}.body`,
        row: `${base}.row`,
        cell: `${base}.cell`,
        columnheader: `${base}.columnheader`,
      },
      dir,
    }
  }, [density, dir])

  const className = useClassName({
    ...styleOverrides,
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

Table.Head = TableHead

Table.Body = TableBody

Table.Row = TableRow

Table.Cell = TableCell

export type TableProps = Overridable & {
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
  element?: ElementType
  /**
   * children
   */
  children?: ReactNode
}
