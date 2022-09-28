import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import { DataView, DataViewHeader, useDataViewState } from '../../data-view'
import {
  Table,
  TableBody,
  TableBodyRow,
  TableCell,
  TableHead,
  useTableState,
} from '../index'
import { Button } from '../../button'
import { createColumns } from '../create-columns'
import { IconTrash, IconPencil, IconCopy } from '@vtex/phosphor-icons'
import { BulkActions, useBulkActions } from '../../bulk-actions'
import { usePaginationState, Pagination } from '../../pagination'
import { FlexSpacer } from '../../flex'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageContent,
} from '../../page'
import { SelectionTree } from '../../components/SelectionTree'

export default {
  title: 'admin-ui-review/table',
  component: Table,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: number
  brand: string
}

const items: Item[] = [...Array(100).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.recent().toDateString(),
    price: faker.datatype.number(),
    brand: faker.random.arrayElement(['mistery_id', 'cool_id']),
  }
})

export function Bulk() {
  const view = useDataViewState()

  const pagination = usePaginationState({
    pageSize: 100,
    total: items.length,
  })

  const pageItems = React.useMemo(
    () => items.slice(pagination.range[0] - 1, pagination.range[1]),
    [pagination.currentPage]
  )

  const bulk = useBulkActions({
    totalItems: pagination.total,
    pageItems,
    pageSize: pageItems.length,
  })

  const columns = createColumns<Item>([
    {
      id: 'id',
      resolver: {
        type: 'bulk',
        state: bulk,
      },
    },
    {
      id: 'name',
      header: 'Product Name',
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
    },
  ])

  const {
    getBodyState,
    getBodyRowState,
    getHeadState,
    getCellState,
    getTableState,
  } = useTableState<Item>({
    status: view.status,
    columns,
    items: pageItems,
  })

  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="wide">
        <DataView state={view}>
          <DataViewHeader>
            <FlexSpacer />
            <Pagination state={pagination} />
          </DataViewHeader>
          <BulkActions state={bulk}>
            <Button variant="tertiary" icon={<IconPencil />}>
              Edit
            </Button>
            <Button variant="tertiary" icon={<IconCopy />}>
              Duplicate
            </Button>
            <Button variant="criticalTertiary" icon={<IconTrash />}>
              Delete
            </Button>
          </BulkActions>
          <SelectionTree state={bulk.selectionTree}>
            <Table {...getTableState()} csx={{ width: '100%' }}>
              <TableHead {...getHeadState()} />
              <TableBody {...getBodyState()}>
                <TableBodyRow {...getBodyRowState()}>
                  <TableCell {...getCellState()} />
                </TableBodyRow>
              </TableBody>
            </Table>
          </SelectionTree>
        </DataView>
      </PageContent>
    </Page>
  )
}

const NUMBER_OF_ITEMS = 100
const ITEMS_PER_PAGE = 5

/**
 * Function to simulate a request
 * You can configure the delay and numberOfItems here
 */
function request(init: number, end: number, delay = 500) {
  return new Promise<Item[]>(function (resolve) {
    setTimeout(resolve, delay, items.slice(init, end))
  })
}

export function BulkWithLoading() {
  const [items, setItems] = React.useState<Item[]>([])
  const view = useDataViewState()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const bulk = useBulkActions({
    totalItems: pagination.total,
    pageItems: items,
    pageSize: ITEMS_PER_PAGE,
  })

  const {
    getBodyState,
    getBodyRowState,
    getHeadState,
    getCellState,
    getTableState,
  } = useTableState({
    status: view.status,
    columns: [
      { id: 'id', resolver: { type: 'bulk', state: bulk } },
      {
        id: 'name',
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    items,
  })

  React.useEffect(() => {
    view.setStatus({ type: 'loading' })
    request(pagination.range[0] - 1, pagination.range[1]).then((d: Item[]) => {
      setItems(d)
      view.setStatus({ type: 'ready' })
    })
  }, [pagination.currentPage])

  return (
    <DataView state={view}>
      <DataViewHeader>
        <FlexSpacer />
        <Pagination state={pagination} />
        <BulkActions state={bulk}>
          <Button variant="tertiary"> Apply 50% discount</Button>
        </BulkActions>
      </DataViewHeader>
      <SelectionTree state={bulk.selectionTree}>
        <Table {...getTableState()}>
          <TableHead {...getHeadState()} />
          <TableBody {...getBodyState()}>
            <TableBodyRow {...getBodyRowState()}>
              <TableCell {...getCellState()} />
            </TableBodyRow>
          </TableBody>
        </Table>
      </SelectionTree>
    </DataView>
  )
}
