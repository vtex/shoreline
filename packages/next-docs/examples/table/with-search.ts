export const files = {
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
