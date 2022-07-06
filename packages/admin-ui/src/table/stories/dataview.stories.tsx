import React, { useEffect, useState } from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'
import { QueryStateProvider } from '@vtex/admin-ui-hooks'

import {
  DataView,
  DataViewControls,
  useDataViewState,
} from '../../components/DataView'
import { Table, useTableState } from '../index'
import { Button } from '../../button'
import { useSearchState, Search, useQuerySearchState } from '../../search'
import { createColumns } from '../create-columns'
import {
  Pagination,
  useQueryPaginationState,
} from '../../components/Pagination'
import { Stack } from '../../stack'
import { TextInput } from '../../text-input'
import { FlexSpacer } from '../../flex'
import {
  FilterGroup,
  FilterMultiple,
  Filter,
  useFilterGroupState,
  useFilterMultipleState,
  useFilterState,
} from '../../filters'

export default {
  title: 'admin-ui-review/table/WithDataView',
  component: Table,
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

export function SearchControls() {
  const [data, setData] = useState(items)
  const view = useDataViewState()
  const search = useSearchState()
  const grid = useTableState<Item>({
    view,
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
    <DataView csx={{ width: 500 }} state={view}>
      <DataViewControls>
        <Search
          {...search.getInputProps()}
          csx={{
            width: 'full',
          }}
        />
      </DataViewControls>
      <Table state={grid} />
    </DataView>
  )
}

export function Status() {
  const view = useDataViewState()
  const grid = useTableState<Item>({
    view,
    columns,
    items,
  })

  return (
    <DataView csx={{ width: 500 }} state={view}>
      <DataViewControls>
        <Button onClick={() => view.setStatus({ type: 'ready' })}>Ready</Button>
        <Button onClick={() => view.setStatus({ type: 'loading' })}>
          Loading
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'error',
              message: 'Something went wrong',
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
          onClick={() =>
            view.setStatus({
              type: 'not-found',
              message: 'The params do not match',
              suggestion: 'Try a different text',
            })
          }
        >
          Not Found
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'empty',
              message: 'You do not have any product yet',
              action: {
                text: 'Create one',
                onClick: () => alert('Clicked'),
              },
            })
          }
        >
          Empty
        </Button>
      </DataViewControls>
      <Table state={grid} />
    </DataView>
  )
}

const items2: Item[] = [...Array(50).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(['mistery_id', 'cool_id']),
  }
})

export function QueryState() {
  const Content = () => {
    const [data, setData] = useState(items2)
    const view = useDataViewState()
    const pagination = useQueryPaginationState({
      pageSize: 5,
      total: items2.length,
    })

    const search = useQuerySearchState({})
    const grid = useTableState<Item>({
      view,
      columns,
      items: data.slice(pagination.range[0] - 1, pagination.range[1]),
    })

    useEffect(() => {
      if (search.debouncedValue !== '') {
        const filtredItems = items2.filter((item) =>
          item.name
            .toLowerCase()
            .startsWith(search.debouncedValue.toLowerCase())
        )

        setData(filtredItems)
        pagination.paginate({ type: 'setTotal', total: filtredItems.length })
        pagination.paginate({ type: 'reset' })
      } else {
        setData(items2)
        pagination.paginate({ type: 'setTotal', total: items2.length })
        pagination.paginate({ type: 'reset' })
      }
    }, [search.debouncedValue])

    return (
      <Stack>
        <TextInput
          label="Current URL:"
          id="current-url-input"
          value={window.location.href}
          disabled
          helpText="You can copy the part with page and search in your URL to see the page load directly with persisted states"
        />
        <DataView csx={{ width: 500 }} state={view}>
          <DataViewControls>
            <Search {...search.getInputProps()} />
            <FlexSpacer />
            <Pagination
              state={pagination}
              preposition="of"
              subject="results"
              prevLabel="Previous"
              nextLabel="Next"
            />
          </DataViewControls>
          <Table state={grid} />
        </DataView>
      </Stack>
    )
  }

  return (
    <QueryStateProvider>
      <Content />
    </QueryStateProvider>
  )
}

export function FilterControls() {
  const [data, setData] = useState(items)
  const view = useDataViewState()

  const grid = useTableState<Item>({
    view,
    columns,
    items: data,
  })

  const [quality, setQuality] = useState<string | number | null>()
  const [brand, setBrand] = useState<Array<string | number> | null>()

  const brandFilterState = useFilterMultipleState({
    items: [
      { label: 'Mistery brand', id: 'mistery_id' },
      { label: 'Cool brand', id: 'cool_id' },
    ],
    onChange: ({ selected }) => {
      const brands = selected.map((brand) => brand.id)

      setBrand(brands)
    },
    label: 'Brand',
  })

  const qualityFilterState = useFilterState({
    items: [
      { label: 'Normal', id: 'norm' },
      { label: 'Premium', id: 'prem' },
    ],
    onChange: ({ selected }) => {
      if (!selected) return

      setQuality(selected.id)
    },
    label: 'Quality',
  })

  const filterGroupState = useFilterGroupState({
    filterStates: [qualityFilterState, brandFilterState],
  })

  useEffect(() => {
    const filtered = items.filter((item) => {
      if (quality === 'norm' && Number(item.price) > 510) {
        return false
      }

      if (quality === 'prem' && Number(item.price) <= 510) {
        return false
      }

      if (brand?.length) {
        if (!brand?.includes('cool_id') && item.brand === 'cool_id') {
          return false
        }

        if (!brand?.includes('mistery_id') && item.brand === 'mistery_id') {
          return false
        }
      }

      return true
    })

    setData(filtered)
  }, [quality, brand])

  return (
    <DataView csx={{ width: 500 }} state={view}>
      <DataViewControls>
        <FilterGroup state={filterGroupState}>
          <FilterMultiple state={brandFilterState} />
          <Filter state={qualityFilterState} />
        </FilterGroup>
      </DataViewControls>
      <Table state={grid} />
    </DataView>
  )
}
