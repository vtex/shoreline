import React from 'react'
import type { Meta } from '@storybook/react'

import {
  DataView,
  useDataViewState,
  DataViewHeader,
  DataViewActions,
} from '../index'
import { Button } from '../../button'
import { Table, useTableState, createColumns } from '../../table'
import faker from 'faker'
import { Page, PageContent, PageHeader } from '../../page'
import { Search } from '../../search'
import { Flex } from '../../flex'
import { IconPlus } from '@vtex/phosphor-icons'
import { Inline } from '../../inline'
import { Pagination, usePaginationState } from '../../pagination'
import {
  FilterDisclosure,
  FilterListbox,
  FilterOptionCheckbox,
  FilterFooter,
  FilterPopover,
  useFilterMultipleState,
} from '../../filters'

export default {
  title: 'admin-ui-review/data-view',
  component: DataView,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
  brand: string
}

const items: Item[] = [...Array(20).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(['mistery_id', 'cool_id']),
  }
})

const columns = createColumns<Item>([
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

const filterItems = [
  { label: 'Full', id: '#1' },
  { label: 'Empty', id: '#2' },
  { label: 'Half full', id: '#3' },
  { label: 'Half empty', id: '#4' },
  { label: 'Unknown', id: '#5' },
  { label: 'Overflowing', id: '#6' },
  { label: 'Less than empty', id: '#7' },
  { label: 'Almost empty', id: '#8' },
  { label: 'Almost full', id: '#9' },
]

const allStatus = [
  { type: 'ready' },
  { type: 'loading' },
  { type: 'not-found' },
  { type: 'empty', action: { text: 'Create item', onClick: () => {} } },
  { type: 'error', action: { text: 'Try again', onClick: () => {} } },
]

export function WithTable() {
  const view = useDataViewState()
  const table = useTableState<Item>({
    view,
    columns,
    items,
    length: 25,
  })

  const pagination = usePaginationState({
    pageSize: 25,
    total: 100,
  })

  const firstFilter = useFilterMultipleState()
  const secondFilter = useFilterMultipleState()

  React.useEffect(() => {
    const total = pagination.total
    const status = view.status

    if (status === 'not-found' || status === 'error') {
      if (total > 0) pagination.paginate({ type: 'setTotal', total: 0 })
    } else if (pagination.total === 0) {
      pagination.paginate({ type: 'setTotal', total: 100 })
    }
  }, [view.status, pagination.total])

  return (
    <Page csx={{ height: '100vh' }}>
      <PageHeader>
        <Inline spaceInside hSpace="$space-2">
          {allStatus.map((item, index) => {
            return (
              <Button
                variant="neutralTertiary"
                key={index}
                onClick={() => view.setStatus(item as any)}
              >
                {item.type}
              </Button>
            )
          })}
        </Inline>
      </PageHeader>

      <PageContent layout="wide" csx={{ minHeight: 'calc(100vh - 92px)' }}>
        <DataView state={view}>
          <DataViewHeader>
            <Flex justify="space-between" csx={{ width: '100%' }}>
              <Search />

              <DataViewActions>
                <Button variant="neutralTertiary" icon={<IconPlus />}>
                  Label
                </Button>
                <Button variant="neutralTertiary" icon={<IconPlus />}>
                  Label
                </Button>
                <Pagination state={pagination} />
              </DataViewActions>
            </Flex>

            <Inline spaceInside hSpace="$space-2">
              <FilterDisclosure state={firstFilter}>Label</FilterDisclosure>

              <FilterPopover state={firstFilter}>
                <FilterListbox>
                  {filterItems.map((item: { label: string; id: string }) => (
                    <FilterOptionCheckbox {...item} />
                  ))}
                </FilterListbox>
                <FilterFooter />
              </FilterPopover>

              <FilterDisclosure state={secondFilter}>Label</FilterDisclosure>

              <FilterPopover state={secondFilter}>
                <FilterListbox>
                  {filterItems.map((item: { label: string; id: string }) => (
                    <FilterOptionCheckbox {...item} />
                  ))}
                </FilterListbox>
                <FilterFooter />
              </FilterPopover>
            </Inline>
          </DataViewHeader>

          <Table state={table} csx={{ width: '100%' }} />

          <Flex justify="flex-end" csx={{ width: '100%' }}>
            <Pagination state={pagination} />
          </Flex>
        </DataView>
      </PageContent>
    </Page>
  );
}
