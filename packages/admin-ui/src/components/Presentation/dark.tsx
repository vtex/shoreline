import React from 'react'
import faker from 'faker'

import { Page, PageContent, PageHeader, PageTitle, PageActions } from '../Page'
import { DataView, useDataViewState } from '../DataView'
import { DataGrid, useDataGridState } from '../DataGrid'
import { Button } from '../Button'
import { useSelectionTreeState, SelectionTree } from '../SelectionTree'

const items = [...Array(20).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

export function WithDataView() {
  const view = useDataViewState()
  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'id',
        resolver: {
          type: 'selection',
          mapId: (item) => item.id,
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
    ],
    items,
  })

  const selection = useSelectionTreeState({
    items: grid.data,
    mapId: (item) => item.id,
  })

  return (
    <Page>
      <PageHeader onPopNavigation={() => console.log('should go back')}>
        <PageTitle>Page Title</PageTitle>
        <PageActions>
          <Button>Primary Action</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataView state={view}>
          <SelectionTree state={selection}>
            <DataGrid state={grid} />
          </SelectionTree>
        </DataView>
      </PageContent>
    </Page>
  )
}
