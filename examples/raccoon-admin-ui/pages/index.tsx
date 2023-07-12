import type { NextPage } from 'next'
import { useAdmin, useNavigation } from '@vtex/raccoon-next'
import {
  Alert,
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  TBody,
  TBodyCell,
  TBodyRow,
  THead,
  THeadCell,
  Table,
  DataView,
  csx,
  createColumns,
  useTableState,
  useDataViewState,
} from '@vtex/admin-ui'
import faker from 'faker'

const ITEMS_PER_PAGE = 5

export const items = Array(ITEMS_PER_PAGE)
  .fill()
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      brand: faker.random.arrayElement(['Revolution', 'VTEX', 'Dream brand']),
      price: faker.commerce.price(),
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
])

const Home: NextPage = () => {
  const { account, locale, workspace } = useAdmin()
  const { navigate } = useNavigation()

  const view = useDataViewState()

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    status: view.status,
    columns,
    items,
    length: ITEMS_PER_PAGE,
  })

  function handleNavigate(item: any) {
    navigate(`/${item.id}`)
  }

  return (
    <Page>
      <PageHeader>
        <PageHeaderTop>
          <PageHeaderTitle>Admin test page</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="wide">
        <Alert>
          Hi, you're on {account} with locale {locale}. On workspace {workspace}
        </Alert>
        <DataView state={view}>
          <Table {...getTable()} className={csx({ width: '100%' })}>
            <THead>
              {columns.map((column) => (
                <THeadCell {...getHeadCell(column)} key={column.id} />
              ))}
            </THead>
            <TBody>
              {data.map((item) => {
                return (
                  <TBodyRow key={item.id} onClick={() => handleNavigate(item)}>
                    {columns.map((column) => {
                      return (
                        <TBodyCell
                          {...getBodyCell(column, item)}
                          key={column.id}
                        />
                      )
                    })}
                  </TBodyRow>
                )
              })}
            </TBody>
          </Table>
        </DataView>
      </PageContent>
    </Page>
  )
}

export default Home
