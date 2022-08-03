import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import {
  DataView,
  DataViewControls,
  useDataViewState,
} from '../../components/DataView'
import { Table, useTableState } from '../index'
import { Button } from '../../button'
import { createColumns } from '../create-columns'
import { IconTrash, IconPencil, IconCopy } from '@vtex/phosphor-icons'
import { BulkActions, useBulkActions } from '../../bulk-actions'
import { Center } from '../../center'
import { usePaginationState, Pagination } from '../../components/Pagination'
import { FlexSpacer } from '../../flex'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageContent,
} from '../../page'

export default {
  title: 'admin-ui-review/table',
  component: Table,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
  brand: string
}

const items: Item[] = [...Array(100).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.recent().toDateString(),
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(['mistery_id', 'cool_id']),
  }
})

export function Bulk() {
  const view = useDataViewState()

  const pagination = usePaginationState({
    pageSize: 20,
    total: items.length,
  })

  const pageItems = items.slice(pagination.range[0] - 1, pagination.range[1])

  const bulk = useBulkActions({
    totalItems: pagination.total,
    pageItems,
    currentPage: pagination.currentPage,
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

  const grid = useTableState<Item>({
    view,
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
          <DataViewControls>
            <FlexSpacer />
            <Pagination
              state={pagination}
              preposition="of"
              subject="results"
              prevLabel="Previous"
              nextLabel="Next"
            />
          </DataViewControls>
          {bulk.isVisible ? (
            <Center>
              <BulkActions state={bulk} csx={{ position: 'fixed', bottom: 25 }}>
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
            </Center>
          ) : null}
          <Table state={grid} />
        </DataView>
      </PageContent>
    </Page>
  )
}
