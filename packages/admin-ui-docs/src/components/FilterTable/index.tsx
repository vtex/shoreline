import React from 'react'
import type {
  DataViewState,
  SearchFormState,
  UsePaginationReturn,
  UseDropdownReturnValue,
  TableState,
} from '@vtex/admin-ui'
import {
  Table,
  DataView,
  DataViewControls,
  Search,
  Dropdown,
  FlexSpacer,
  Pagination,
} from '@vtex/admin-ui'

import style from './styles'

export function FilterTable<T>(props: TableFilterProps<T>) {
  const { pagination, table, filters, dataView, search, dropdown } = props

  return (
    <DataView state={dataView} csx={style.dataView}>
      <DataViewControls csx={style.dataViewControls}>
        <Search {...search.getInputProps()} />
        <Dropdown
          label="Filters"
          state={dropdown}
          items={filters}
          variant="neutralTertiary"
        />
        <FlexSpacer />
        {pagination && (
          <Pagination
            state={pagination}
            preposition="of"
            subject="results"
            prevLabel="Previous"
            nextLabel="Next"
          />
        )}
      </DataViewControls>
      <Table state={table} csx={style.table} />
    </DataView>
  )
}

interface TableFilterProps<T> {
  pagination?: UsePaginationReturn
  table: TableState<T>
  filters: string[]
  dataView: DataViewState
  search: SearchFormState
  dropdown: UseDropdownReturnValue<string>
}
