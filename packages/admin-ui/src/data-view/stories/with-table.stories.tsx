import React from 'react'
import type { Meta } from '@storybook/react'

import {
  DataView,
  useDataViewState,
  DataViewHeader,
  DataViewReady,
  DataViewActions,
} from '../index'
import { Button } from '../../button'
import { Table, useTableState, createColumns } from '../../table'
import faker from 'faker'
import { Page, PageContent, PageHeader } from '../../page'
import { Search } from '../../search'
import { Flex } from '../../flex'
import { Stack } from '../../stack'
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

export function WithTable() {
  const view = useDataViewState()
  const table = useTableState<Item>({
    view,
    columns,
    items,
  })

  const pagination = usePaginationState({
    pageSize: 25,
    total: 100,
  })

  const filterStatus = useFilterMultipleState()
  const filterLabel = useFilterMultipleState()

  return (
    <Page>
      <PageHeader>
        <Inline spaceInside hSpace="$m">
          <Button
            variant="neutralTertiary"
            onClick={() => view.setStatus({ type: 'ready' })}
          >
            Ready
          </Button>
          <Button
            variant="neutralTertiary"
            onClick={() => view.setStatus({ type: 'loading' })}
          >
            Loading
          </Button>
          <Button
            variant="neutralTertiary"
            onClick={() =>
              view.setStatus({
                type: 'error',
                action: {
                  text: 'Try again',
                  onClick: () => alert('Clicked'),
                },
              })
            }
          >
            Error
          </Button>
          <Button
            variant="neutralTertiary"
            onClick={() =>
              view.setStatus({
                type: 'not-found',
                suggestion: 'Try a different text',
              })
            }
          >
            Not Found
          </Button>
          <Button
            variant="neutralTertiary"
            onClick={() =>
              view.setStatus({
                type: 'empty',
                action: {
                  text: 'Try again',
                  onClick: () => {},
                },
              })
            }
          >
            Empty
          </Button>
        </Inline>
      </PageHeader>

      <PageContent>
        <DataView state={view}>
          <DataViewHeader>
            <Stack space="$xl">
              <Search />
              <Inline spaceInside hSpace="$m">
                <FilterDisclosure state={filterStatus}>Status</FilterDisclosure>

                <FilterPopover state={filterStatus}>
                  <FilterListbox>
                    {filterItems.map((item: { label: string; id: string }) => (
                      <FilterOptionCheckbox {...item} />
                    ))}
                  </FilterListbox>
                  <FilterFooter />
                </FilterPopover>

                <FilterDisclosure state={filterLabel}>Label</FilterDisclosure>

                <FilterPopover state={filterLabel}>
                  <FilterListbox>
                    {filterItems.map((item: { label: string; id: string }) => (
                      <FilterOptionCheckbox {...item} />
                    ))}
                  </FilterListbox>
                  <FilterFooter />
                </FilterPopover>
              </Inline>
            </Stack>

            <DataViewActions>
              <Button variant="neutralTertiary">Label</Button>
              <Button variant="neutralTertiary">Label</Button>
              <Button variant="neutralTertiary">Label</Button>
              <Pagination state={pagination} />
            </DataViewActions>
          </DataViewHeader>

          <Table state={table} csx={{ width: '100%' }} />

          <DataViewReady>
            <Flex justify="flex-end" csx={{ width: '100%' }}>
              <Pagination state={pagination} />
            </Flex>
          </DataViewReady>
        </DataView>
      </PageContent>
    </Page>
  )
}
