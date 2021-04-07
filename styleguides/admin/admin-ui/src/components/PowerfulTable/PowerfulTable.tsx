import React, { MouseEventHandler, Ref } from 'react'
import { StatefulTable, StatefulTableProps } from '../Table/Stateful'
import { Box } from '@vtex/admin-primitives'
import { TableToolbar } from './components/Toolbar'
import { forwardRef } from 'styleguides/admin/system/dist'

const _PowerfulTable = forwardRef(function Table<T>(
  props: PowerfulTableProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const {
    onSearch,
    searchDisabled,
    searchLoading,
    onExport,
    onImport,
    exportDisabled,
    importDisabled,
    filterDisabled,
    searchPlaceholder,
    filterLabel,
    exportLabel,
    importLabel,
    csx,
    children,
    ...statefulTableProps
  } = props

  return (
    <Box ref={ref} csx={csx}>
      <StatefulTable {...statefulTableProps}>{children}</StatefulTable>
    </Box>
  )
})

export const PowerfulTable = Object.assign(_PowerfulTable, {
  Toolbar: TableToolbar,
})

export interface PowerfulTableProps<T> extends StatefulTableProps<T> {
  /**
   * Function called when search state changes
   */
  onSearch?: (onSearchValue: string) => void
  /**
   * Search input loading state
   */
  searchLoading?: boolean
  /**
   * Search input disabled state
   */
  searchDisabled?: boolean
  /**
   * Funtion called when export button is clicked
   */
  onExport?: MouseEventHandler<any> | undefined
  /**
   * Funtion called when import button is clicked
   */
  onImport?: MouseEventHandler<any> | undefined
  /**
   * Export disabled state
   */
  exportDisabled?: boolean
  /**
   * Import disabled state
   */
  importDisabled?: boolean
  /**
   * Filter disabled state
   */
  filterDisabled?: boolean
  /**
   * Search input placeholder
   * @default "Search"
   */
  searchPlaceholder?: string
  /**
   * Import button label
   * @default "Import"
   */
  importLabel?: string
  /**
   * Export button label
   * @default "Export"
   */
  exportLabel?: string
  /**
   * Filter button label
   * @default "Label"
   */
  filterLabel?: string
}

export type TableToolbarProps<T> = Pick<
  PowerfulTableProps<T>,
  | 'onSearch'
  | 'searchLoading'
  | 'searchDisabled'
  | 'onImport'
  | 'onExport'
  | 'exportDisabled'
  | 'importDisabled'
  | 'filterDisabled'
  | 'searchPlaceholder'
  | 'filterLabel'
  | 'importLabel'
  | 'exportLabel'
>
