import React, { ElementType, ReactNode, useMemo, forwardRef, Ref } from 'react'

import { Box } from '../../Box'
import { TableDensity, TableDir } from '../typings'
import { StylesContext } from '../context'
import { Overridable } from '../../../types'
import { TableHead } from './Head'
import { TableBody } from './Body'
import { TableRow } from './Row'
import { TableCell } from './Cell'

const _Table = forwardRef(function Table(
  props: TableProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    dir = 'ltr',
    children,
    density = 'regular',
    element = 'div',
    styleOverrides = {},
    ...boxProps
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
        rowClickable: `${base}.row-clickable`,
        cell: `${base}.cell`,
        columnheader: `${base}.columnheader`,
      },
      dir,
    }
  }, [density, dir])

  return (
    <Box
      ref={ref}
      themeKey={styles.variants.table}
      styles={styleOverrides}
      role="table"
      element={element}
      dir={dir}
      {...boxProps}
    >
      <StylesContext.Provider value={styles}>{children}</StylesContext.Provider>
    </Box>
  )
})

export const Table = Object.assign(_Table, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
})

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
