export const dependencies = {
  faker: '5.x',
}

export const files = {
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
