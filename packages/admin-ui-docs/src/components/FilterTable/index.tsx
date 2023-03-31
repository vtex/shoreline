import React from 'react'
import type {
  DataViewState,
  SearchFormState,
  UsePaginationReturn,
  UseDropdownReturnValue,
  UseTableStateReturn,
} from '@vtex/admin-ui'
import {
  csx,
  Flex,
  Table,
  TBody,
  TBodyRow,
  TBodyCell,
  THead,
  THeadCell,
  DataView,
  DataViewHeader,
  Search,
  Dropdown,
  FlexSpacer,
  Pagination,
} from '@vtex/admin-ui'

import style from './styles'

export function FilterTable<T>(props: TableFilterProps<T>) {
  const { pagination, table, filters, dataView, search, dropdown } = props

  const { data, getBodyCell, getHeadCell, getTable, columns } = table

  return (
    <DataView state={dataView} className={csx(style.dataView)}>
      <DataViewHeader className={csx(style.dataViewHeader)}>
        <Flex>
          <Search {...search.getInputProps()} />
          <Dropdown
            label="Filters"
            state={dropdown}
            items={filters}
            variant="neutralTertiary"
          />
        </Flex>
        <FlexSpacer />
        {pagination && <Pagination state={pagination} />}
      </DataViewHeader>
      <Table {...getTable()} csx={style.table}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item, id) => {
            return (
              <TBodyRow key={`filter-table-row-${id}`}>
                {columns.map((column) => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>
      </Table>
    </DataView>
  )
}

interface TableFilterProps<T> {
  pagination?: UsePaginationReturn
  table: UseTableStateReturn<T>
  filters: string[]
  dataView: DataViewState
  search: SearchFormState
  dropdown: UseDropdownReturnValue<string>
}
