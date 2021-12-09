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
            color: '$action.neutral.tertiary',
            bg: '$action.neutral.tertiary',
            ':hover': {
              color: '$action.neutral.tertiaryHover',
              bg: '$action.neutral.tertiaryHover',
            },
            ':active': {
              color: '$action.neutral.tertiaryPressed',
              bg: '$action.neutral.tertiaryPressed',
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
  dropdown: UseDropdownReturnValue<string>
}
