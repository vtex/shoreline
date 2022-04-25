import React from 'react'
import type {
  DataViewState,
  SearchFormState,
  UsePaginationReturn,
  UseDropdownReturnValue,
  DataGridState,
} from '@vtex/admin-ui'
import {
  DataGrid,
  DataView,
  DataViewControls,
  Search,
  Dropdown,
  FlexSpacer,
  Pagination,
} from '@vtex/admin-ui'

import style from './styles'

export function FilterDataGrid<T>(props: DataGridFilterProps<T>) {
  const { pagination, dataGrid, filters, dataView, search, dropdown } = props

  return (
    <DataView state={dataView} csx={style.dataView}>
      <DataViewControls csx={style.dataViewControls}>
        <Search id="search" placeholder="Search" state={search} />
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
      <DataGrid state={dataGrid} csx={style.dataGrid} />
    </DataView>
  )
}

interface DataGridFilterProps<T> {
  pagination?: UsePaginationReturn
  dataGrid: DataGridState<T>
  filters: string[]
  dataView: DataViewState
  search: SearchFormState
  dropdown: UseDropdownReturnValue<string>
}
