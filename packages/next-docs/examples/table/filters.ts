export const dependencies = {
  faker: '5.x',
}

export const files = {
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
