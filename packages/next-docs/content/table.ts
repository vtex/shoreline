export const anatomy = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  useDataViewState,
  IconEye,
  csx,
  Tag,
} from '@vtex/admin-ui'

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '6rem' })}>{item.brand}</div>
      },
    },
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

const items = [
  {
    id: 495953,
    name: 'Wooden Eyeglasses',
    status: 'Inactive',
    brand: 'Revolution',
    price: 42.14,
  },
  {
    id: 429048,
    name: 'Brazil Straw Hat',
    status: 'Inactive',
    brand: 'Pathway',
    price: 38.52,
  },
  {
    id: 495954,
    name: 'Striped Beach Short',
    status: 'Inactive',
    brand: 'Desire Spirit',
    price: 23.49,
  },
]

export default function App() {
  const view = useDataViewState()
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    items,
  })

  return (
    <DataView state={view}>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
}`,
}

export const searchForm = {
  '/App.js': `import { useMemo } from 'react'
import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  csx,
  Tag,
  Search,
  useSearchState,
} from '@vtex/admin-ui'

const items = [
  {
    id: 495953,
    name: 'Wooden Eyeglasses',
    status: 'Inactive',
    brand: 'Revolution',
    price: 42.14,
  },
  {
    id: 429048,
    name: 'Brazil Straw Hat',
    status: 'Inactive',
    brand: 'Pathway',
    price: 38.52,
  },
  {
    id: 495954,
    name: 'Striped Beach Short',
    status: 'Inactive',
    brand: 'Desire Spirit',
    price: 23.49,
  },
]

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const view = useDataViewState()
  const search = useSearchState()

  const searchedItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().startsWith(
        // use the search debounced value to
        // filter the collection
        search.debouncedValue.toLocaleLowerCase()
      )
    )
  }, [search])

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    items: searchedItems,
    length: 5,
  })

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Search id="search" {...search.getInputProps()} />
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
}`,
}

export const toolbar = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  IconArrowLineUp,
  csx,
  Tag,
  Toolbar,
  ToolbarButton,
  useToolbarState,
} from '@vtex/admin-ui'

const items = [
  {
    id: 495953,
    name: 'Wooden Eyeglasses',
    status: 'Inactive',
    brand: 'Revolution',
    price: 42.14,
  },
  {
    id: 429048,
    name: 'Brazil Straw Hat',
    status: 'Inactive',
    brand: 'Pathway',
    price: 38.52,
  },
  {
    id: 495954,
    name: 'Striped Beach Short',
    status: 'Inactive',
    brand: 'Desire Spirit',
    price: 23.49,
  },
]

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const toolbar = useToolbarState()
  const view = useDataViewState()
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    items,
  })

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Toolbar state={toolbar}>
          <ToolbarButton size="small" variant="text" icon={<IconEye />}>
            Import
          </ToolbarButton>
          <ToolbarButton size="small" variant="text" icon={<IconArrowLineUp />}>
            Export
          </ToolbarButton>
        </Toolbar>
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
}`,
}

export const paginationDeps = {
  faker: '5.x',
}

export const pagination = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  csx,
  Tag,
  Pagination,
  usePaginationState,
  FlexSpacer,
} from '@vtex/admin-ui'
import faker from 'faker'

const NUMBER_OF_ITEMS = 100
const ITEMS_PER_PAGE = 5

const items = Array(NUMBER_OF_ITEMS)
  .fill()
  .map((_, id) => {
    return {
      id,
      name: faker.commerce.productName(),
      brand: faker.random.arrayElement([
        'Revolution',
        'Desire Spirit',
        'Pathway',
        'AeroSmart',
        'Quality Prints',
        'Traction Race',
      ]),
      price: faker.commerce.price(),
      status: 'Inactive',
    }
  })

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '6rem' })}>{item.brand}</div>
      },
    },
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const view = useDataViewState()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    items: items.slice(pagination.range[0] - 1, pagination.range[1]),
    length: ITEMS_PER_PAGE,
  })

  return (
    <DataView state={view}>
      <DataViewHeader>
        <FlexSpacer />
        <Pagination state={pagination} />
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
}`,
}

export const status = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  csx,
  Tag,
  Button,
  Flex,
} from '@vtex/admin-ui'

const items = [
  {
    id: 495953,
    name: 'Wooden Eyeglasses',
    status: 'Inactive',
    brand: 'Revolution',
    price: 42.14,
  },
  {
    id: 429048,
    name: 'Brazil Straw Hat',
    status: 'Inactive',
    brand: 'Pathway',
    price: 38.52,
  },
  {
    id: 495954,
    name: 'Striped Beach Short',
    status: 'Inactive',
    brand: 'Desire Spirit',
    price: 23.49,
  },
]

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const view = useDataViewState()
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    items,
    columns,
    length: 3,
  })

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Flex>
          <Button
            onClick={() =>
              view.setStatus({
                type: 'ready',
              })
            }
          >
            Ready
          </Button>
          <Button
            onClick={() =>
              view.setStatus({
                type: 'loading',
              })
            }
          >
            Loading
          </Button>
          <Button
            onClick={() =>
              view.setStatus({
                type: 'error',
              })
            }
          >
            Error
          </Button>
          <Button
            onClick={() =>
              view.setStatus({
                type: 'not-found',
              })
            }
          >
            Not Found
          </Button>
          <Button
            onClick={() =>
              view.setStatus({
                type: 'empty',
              })
            }
          >
            Empty
          </Button>
        </Flex>
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
  `,
}

export const filtersDeps = {
  faker: '5.x',
}

export const filters = {
  '/App.js': `import { useEffect, useState } from 'react'
import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  csx,
  Tag,
  FilterDisclosure,
  FilterPopover,
  FilterListbox,
  FilterOptionRadio,
  FilterOptionCheckbox,
  FilterFooter,
  FilterGroup,
  useFilterState,
  useFilterMultipleState,
  useFilterGroupState,
} from '@vtex/admin-ui'
import faker from 'faker'

const StatusFilter = ({ state }) => {
  return (
    <>
      <FilterDisclosure state={state}>Status</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterListbox>
          <FilterOptionRadio label={'Active'} id="active" />
          <FilterOptionRadio label={'Inactive'} id="inactive" />
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

const BrandFilter = ({ state }) => {
  const list = [
    'Revolution',
    'Desire Spirit',
    'Pathway',
    'AeroSmart',
    'Quality Prints',
    'Traction Race',
  ]

  return (
    <>
      <FilterDisclosure state={state}>Brand</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterListbox>
          {list.map((item) => (
            <FilterOptionCheckbox label={item} id={item} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

const NUMBER_OF_ITEMS = 15

const items = Array(NUMBER_OF_ITEMS)
  .fill()
  .map((_, id) => {
    return {
      id,
      name: faker.commerce.productName(),
      brand: faker.random.arrayElement([
        'Revolution',
        'Desire Spirit',
        'Pathway',
        'AeroSmart',
        'Quality Prints',
        'Traction Race',
      ]),
      price: faker.commerce.price(),
      status: faker.random.arrayElement(['Active', 'Inactive']),
    }
  })

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '6rem' })}>{item.brand}</div>
      },
    },
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const [data, setData] = useState(items)
  const view = useDataViewState()

  const { getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    items: data,
  })

  const statusState = useFilterState()
  const brandState = useFilterMultipleState()

  const filterGroupState = useFilterGroupState({
    filterStates: [statusState, brandState],
  })

  useEffect(() => {
    const filtered = items.filter((item) => {
      if (
        statusState.appliedItem &&
        statusState.appliedItem.label !== item.status
      ) {
        return false
      }

      if (
        brandState.appliedItems &&
        brandState.appliedItems.length &&
        !brandState.appliedItems.find((i) => i.label === item.brand)
      ) {
        return false
      }

      return true
    })
    setData(filtered)
  }, [statusState.appliedItem, brandState.appliedItems])

  return (
    <DataView state={view}>
      <DataViewHeader>
        <FilterGroup state={filterGroupState}>
          <StatusFilter state={statusState} />
          <BrandFilter state={brandState} />
        </FilterGroup>
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
}`,
}

export const topbarDeps = {
  faker: '5.x',
}

export const topbar = {
  '/App.js': `import { useMemo } from 'react'
import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  IconArrowLineUp,
  csx,
  Tag,
  useToolbarState,
  useSearchState,
  usePaginationState,
  Search,
  Toolbar,
  ToolbarButton,
  Pagination,
  FlexSpacer,
} from '@vtex/admin-ui'
import faker from 'faker'

const NUMBER_OF_ITEMS = 100
const ITEMS_PER_PAGE = 5

const items = Array(NUMBER_OF_ITEMS)
  .fill()
  .map((_, id) => {
    return {
      id,
      name: faker.commerce.productName(),
      brand: faker.random.arrayElement([
        'Revolution',
        'Desire Spirit',
        'Pathway',
        'AeroSmart',
        'Quality Prints',
        'Traction Race',
      ]),
      price: faker.commerce.price(),
      status: 'Inactive',
    }
  })

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '6rem' })}>{item.brand}</div>
      },
    },
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const toolbar = useToolbarState()
  const view = useDataViewState()
  const search = useSearchState()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const paginatedItems = useMemo(() => {
    pagination.paginate({ type: 'reset' })
    return items.filter((item) =>
      item.name.toLowerCase().startsWith(
        // use the search debounced value to
        // filter the collection
        search.debouncedValue.toLocaleLowerCase()
      )
    )
  }, [search.debouncedValue])

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    items: [...paginatedItems].slice(
      pagination.range[0] - 1,
      pagination.range[1]
    ),
    length: ITEMS_PER_PAGE,
  })

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Search id="search" {...search.getInputProps()} />
        <Toolbar state={toolbar} aria-label="Toolbar">
          <ToolbarButton size="small" variant="text" icon={<IconEye />}>
            Import
          </ToolbarButton>
          <ToolbarButton size="small" variant="text" icon={<IconArrowLineUp />}>
            Export
          </ToolbarButton>
        </Toolbar>
        <FlexSpacer />
        <Pagination
          state={pagination}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
        />
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
`,
}

export const dataFetchDeps = {
  faker: '5.x',
}

export const dataFetch = {
  '/App.js': `import React from 'react'
import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  DataView,
  DataViewHeader,
  useDataViewState,
  IconEye,
  csx,
  Tag,
  Button,
} from '@vtex/admin-ui'
import faker from 'faker'

/**
 * Function to simulate a request
 * You can configure the delay and numberOfItems here
 */
function request(delay = 3000, numberOfItems = 3) {
  return new Promise(function (resolve) {
    setTimeout(
      resolve,
      delay,
      Array(numberOfItems)
        .fill()
        .map((_, id) => {
          return {
            id,
            name: faker.commerce.productName(),
            brand: faker.random.arrayElement([
              'Revolution',
              'Desire Spirit',
              'Pathway',
              'AeroSmart',
              'Quality Prints',
              'Traction Race',
            ]),
            price: faker.commerce.price(),
            status: 'Inactive',
          }
        })
    )
  })
}

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '3fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '2fr',
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

export default function App() {
  const [items, setItems] = React.useState([])
  /**
   * This is just for the example purposes so, nevermind
   */
  const [update, setUpdate] = React.useState(false)

  const view = useDataViewState()
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    length: 3,
    items,
  })

  React.useEffect(() => {
    view.setStatus({
      type: 'loading',
    })
    request().then((d) => {
      setItems(d)
      view.setStatus({
        type: 'ready',
      })
    })
  }, [update])

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Button
          onClick={() => {
            setUpdate((u) => !u)
          }}
        >
          Simulate data fetching
        </Button>
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
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
`,
}

export const selectable = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  IconEye,
  csx,
  Tag,
  SelectionTree,
  useSelectionTreeState,
} from '@vtex/admin-ui'

const columns = createColumns([
  {
    id: 'id',
    resolver: {
      type: 'selection',
      mapId: (item) => item.id,
    },
  },
  {
    id: 'name',
    header: 'Name',
    width: '2fr',
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '5rem' })}>{item.brand}</div>
      },
    },
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <Tag label={item.status} size="normal" />
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

const items = [
  {
    id: 495953,
    name: 'Wooden Eyeglasses',
    status: 'Inactive',
    brand: 'Revolution',
    price: 42.14,
  },
  {
    id: 429048,
    name: 'Brazil Straw Hat',
    status: 'Inactive',
    brand: 'Pathway',
    price: 38.52,
  },
  {
    id: 495954,
    name: 'Striped Beach Short',
    status: 'Inactive',
    brand: 'Desire Spirit',
    price: 23.49,
  },
]

export default function App() {
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    length: 3,
    items,
  })

  const selection = useSelectionTreeState({
    items: data,
    mapId: (item) => item.id,
  })

  return (
    <SelectionTree state={selection}>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
                {columns.map((column) => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>
      </Table>
    </SelectionTree>
  )
}
`,
}

export const fixedColumns = {
  '/App.js': `import { 
  createColumns,
  Table,
  THead,
  THeadCell,
  TBody,
  TBodyRow,
  TBodyCell,
  useTableState,
  IconEye,
  csx,
  Tag,
  SelectionTree,
  useSelectionTreeState,
} from '@vtex/admin-ui'

const columns = createColumns([
  {
    id: 'name',
    header: 'Name',
    width: '3fr',
    fixed: true,
    resolver: {
      type: 'text',
      columnType: 'name',
      mapText: (item) => item.name,
      render: ({ data }) => (
        <div className={csx({ minWidth: '10rem' })}>{data}</div>
      ),
    },
  },
  {
    id: 'id',
    header: 'ID',
    width: '1fr',
  },
  {
    id: 'label',
    header: 'Label',
    width: '2fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '10rem' })}>{item.label}</div>
      },
    },
  },
  {
    id: 'brand',
    header: 'Brand',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return <div className={csx({ minWidth: '5rem' })}>{item.brand}</div>
      },
    },
  },
  {
    id: 'price',
    header: 'Price',
    width: '1fr',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
  {
    id: 'status',
    header: 'Status',
    width: '1fr',
    resolver: {
      type: 'root',
      render: ({ item }) => {
        return (
          <div className={csx({ minWidth: '5rem' })}>
            <Tag label={item.status} size="normal" />
          </div>
        )
      },
    },
  },
  {
    resolver: {
      type: 'menu',
      actions: [
        {
          label: 'View details',
          icon: <IconEye />,
        },
      ],
    },
  },
])

const items = [
  {
    id: 495953,
    name: 'Wooden Eyeglasses',
    status: 'Inactive',
    brand: 'Revolution',
    label: 'Apparel & Accessories',
    price: 42.14,
  },
  {
    id: 429048,
    name: 'Brazil Straw Hat',
    status: 'Inactive',
    brand: 'Pathway',
    label: 'Apparel & Accessories',
    price: 38.52,
  },
  {
    id: 495954,
    name: 'Striped Beach Short',
    status: 'Inactive',
    brand: 'Desire Spirit',
    label: 'Apparel & Accessories',
    price: 23.49,
  },
]

export default function App() {
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    length: 3,
    items,
  })

  const selection = useSelectionTreeState({
    items: data,
    mapId: (item) => item.id,
  })

  return (
    <SelectionTree state={selection}>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow
                key={item.id}
                onClick={() => alert('Item: item.name')}
              >
                {columns.map((column) => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>
      </Table>
    </SelectionTree>
  )
}
`,
}
