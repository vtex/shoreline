import React from 'react'
import type {
  DataViewState,
  SearchFormState,
  UsePaginationReturn,
  UseSelectReturnValue,
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

export function FilterDataGrid<T>(props: DataGridFilterProps<T>) {
  const { pagination, dataGrid, filters, dataView, search, dropdown } = props

  return (
    <DataView state={dataView}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
        <Dropdown
          label="Filters"
          state={dropdown}
          items={filters}
          csx={{
            color: 'action.neutral.ghost',
            bg: 'action.neutral.ghost',
            ':hover': {
              color: 'action.neutral.ghostHover',
              bg: 'action.neutral.ghostHover',
            },
            ':active': {
              color: 'action.neutral.ghostPressed',
              bg: 'action.neutral.ghostPressed',
            },
          }}
        />
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
        />
      </DataViewControls>
      <DataGrid state={dataGrid} />
    </DataView>
  )
}

interface DataGridFilterProps<T> {
  pagination: UsePaginationReturn
  dataGrid: DataGridState<T>
  filters: string[]
  dataView: DataViewState
  search: SearchFormState
  dropdown: UseSelectReturnValue<string>
}
