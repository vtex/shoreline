import React, { useState, useEffect } from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageHeaderActions,
  PageHeaderBottom,
  PageHeaderButton,
  PageHeaderMenuButton,
  PageHeaderTags,
  PageHeaderTag,
} from './index'
import { useTabState, TabPanel, TabList, Tab } from '../tab'
import { DataView, DataViewHeader, useDataViewState } from '../data-view'
import { Search, useSearchState } from '../search'
import {
  createColumns,
  Table,
  TBody,
  TBodyRow,
  THead,
  THeadCell,
  useTableState,
  TBodyCell,
} from '../table'
import { Box } from '../box'
import { Menu, MenuItem, useMenuState } from '../menu'
import { IconPencil, IconPlus } from '@vtex/phosphor-icons'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/page',
} as Meta

export function Basic() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>Page content</PageContent>
    </Page>
  )
}

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const items: Item[] = [...Array(20).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
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

function Placeholder() {
  return (
    <div
      className={csx({
        height: '80vh',
        bg: '$secondary',
      })}
    />
  )
}

export function Standard() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}

export function Narrow() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="narrow">
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}

export function Wide() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="wide">
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}

export function FullFledged() {
  const tabs = useTabState()
  const state = useMenuState()
  const [data, setData] = useState(items)
  const view = useDataViewState()
  const search = useSearchState()

  const {
    getBodyCell,
    getHeadCell,
    getTable,
    data: tableData,
  } = useTableState<Item>({
    status: view.status,
    columns,
    items: data,
  })

  useEffect(() => {
    if (search.debouncedValue !== '') {
      setData(
        items.filter((item) =>
          item.name
            .toLowerCase()
            .startsWith(search.debouncedValue.toLowerCase())
        )
      )
    } else {
      setData(items)
    }
  }, [search.debouncedValue])

  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>
            Product #123{' '}
            <PageHeaderTags>
              <PageHeaderTag label="Short text" />
            </PageHeaderTags>
          </PageHeaderTitle>
          <PageHeaderActions>
            <PageHeaderButton variant="secondary">Edit</PageHeaderButton>
            <PageHeaderButton>Create</PageHeaderButton>
            <PageHeaderMenuButton state={state} />
            <Menu state={state} aria-label="actions">
              <MenuItem label="Create" icon={<IconPlus />} />
              <MenuItem label="Edit" icon={<IconPencil />} />
            </Menu>
          </PageHeaderActions>
        </PageHeaderTop>
        <PageHeaderBottom>
          <TabList state={tabs}>
            <Tab id="1">Label</Tab>
            <Tab id="2">Label</Tab>
            <Tab id="3">Label</Tab>
          </TabList>
        </PageHeaderBottom>
      </PageHeader>
      <PageContent layout="wide">
        <TabPanel state={tabs} id="1">
          <DataView state={view}>
            <DataViewHeader>
              <Search id="search" aria-label="DataGrid Search" />
            </DataViewHeader>
            <Table {...getTable()} className={csx({ width: '100%' })}>
              <THead>
                {columns.map((column) => {
                  return <THeadCell {...getHeadCell(column)} />
                })}
              </THead>
              <TBody>
                {tableData.map((item) => {
                  return (
                    <TBodyRow key={item.id}>
                      {columns.map((column) => {
                        return <TBodyCell {...getBodyCell(column, item)} />
                      })}
                    </TBodyRow>
                  )
                })}
              </TBody>
            </Table>
          </DataView>
        </TabPanel>

        <TabPanel state={tabs} id="2">
          <Placeholder />
        </TabPanel>
        <TabPanel state={tabs} id="3">
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </TabPanel>
      </PageContent>
    </Page>
  )
}
