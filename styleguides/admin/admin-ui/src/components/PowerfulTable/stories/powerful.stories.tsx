import React, { useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'
import { StatefulTable } from '../Stateful'
import { IconExport, IconImport, IconFilter } from '@vtex/admin-ui-icons'
import { Pagination, usePaginationState } from '../../Pagination'
import { FlexSpacer } from '@vtex/admin-primitives'
import { useTableState } from '../../Table'

export default {
  title: 'admin-ui/PowerfulTable/CompleteToolbar',
  component: StatefulTable,
} as Meta

const items = [...Array(10).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const tableSize = 5

export function CompleteTopbar() {
  const [search, setSearch] = useState('')
  const paginationState = usePaginationState({
    size: tableSize,
  })

  const filteredItems: Item[] = useMemo(() => {
    return items.filter((item) => {
      paginationState.paginate('reset')

      return (
        item.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
        item.lastSale.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
        item.price.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      )
    })
  }, [search])

  const tableState = useTableState({
    columns: [
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
    items: [...filteredItems].slice(
      paginationState.range[0] - 1,
      paginationState.range[1]
    ),
    length: tableSize,
  })

  return (
    <StatefulTable state={tableState}>
      <StatefulTable.Section>
        <StatefulTable.Search
          id="search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <StatefulTable.Toolbar>
          <StatefulTable.Toolbar.Button icon={<IconFilter />}>
            Filter
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button icon={<IconImport />}>
            Import
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button icon={<IconExport />}>
            Export
          </StatefulTable.Toolbar.Button>
        </StatefulTable.Toolbar>
        <FlexSpacer />
        <Pagination
          state={paginationState}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
          total={items.length}
        />
      </StatefulTable.Section>
    </StatefulTable>
  )
}
