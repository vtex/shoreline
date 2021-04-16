import React, { useEffect, useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { StatefulTable } from '../index'
import { Column } from '../typings'
import {
  SortState,
  SortAction,
  SortOrder,
  SortCallbackParams,
} from '../hooks/useTableSort'

export default {
  title: 'experimental/Table/Sort',
  component: StatefulTable,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const itemsCompareFn: Record<
  keyof Item,
  ((a: Item, b: Item) => number) | undefined
> = {
  id: undefined,
  name: (a: Item, b: Item) => a.name.localeCompare(b.name),
  price: (a: Item, b: Item) => parseInt(a.price, 10) - parseInt(b.price, 10),
  lastSale: (a: Item, b: Item) => {
    const aLastSale = new Date(a.lastSale).valueOf()
    const bLastSale = new Date(b.lastSale).valueOf()

    return aLastSale - bLastSale
  },
}

function getItems(
  direction?: 'ASC' | 'DSC' | 'RESET',
  by?: keyof Item
): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          {
            id: `0`,
            name: 'Refined Cotton Ball',
            lastSale: 'Wed Mar 17 2021',
            price: '574.00',
          },
          {
            id: `2`,
            name: 'Tasty Cotton Ball',
            lastSale: 'Fri Aug 14 2020',
            price: '731.0',
          },
          {
            id: `3`,
            name: 'John',
            lastSale: 'Tue Aug 25 2020',
            price: '952.0',
          },
          {
            id: `4`,
            name: 'Small Wooden Salad',
            lastSale: 'Wed May 20 2020',
            price: '285.0',
          },
        ].sort(
          direction && direction !== 'RESET' && by
            ? (a, b) => {
                if (direction === 'ASC') {
                  return itemsCompareFn[by]?.(a, b) ?? 0
                }

                const compareResult = itemsCompareFn[by]?.(a, b)

                return compareResult ? compareResult * -1 : 0
              }
            : undefined
        )
      )
    }, 1000)
  })
}

export function Sortable() {
  const items = useMemo(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const columns: Column<Item>[] = [
    {
      id: 'name',
      header: 'Product Name',
      compare: (a, b) => b.name.localeCompare(a.name),
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
      compare: (a, b) => parseInt(b.price, 10) - parseInt(a.price, 10),
    },
  ]

  return <StatefulTable columns={columns} items={items} />
}

export function SortDirections() {
  const items = useMemo(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const columns: Column<Item>[] = [
    {
      id: 'name',
      header: 'Product Name',
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
      compare: (a, b) => {
        const aLastSale = new Date(a.lastSale).valueOf()
        const bLastSale = new Date(b.lastSale).valueOf()

        return bLastSale - aLastSale
      },
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      compare: (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
    },
  ]

  return (
    <StatefulTable
      columns={columns}
      items={items}
      sort={{ directions: ['ASC'] }}
    />
  )
}

export function SortInitialState() {
  const items = useMemo(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const columns: Column<Item>[] = [
    {
      id: 'name',
      header: 'Product Name',
      compare: (a, b) => a.name.localeCompare(b.name),
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
      compare: (a, b) => {
        const aLastSale = new Date(a.lastSale).valueOf()
        const bLastSale = new Date(b.lastSale).valueOf()

        return bLastSale - aLastSale
      },
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      compare: (a, b) => parseInt(b.price, 10) - parseInt(a.price, 10),
    },
  ]

  return (
    <StatefulTable
      columns={columns}
      items={items}
      sort={{
        directions: ['ASC', 'DSC'],
        initialValue: { by: 'price', order: 'DSC' },
      }}
    />
  )
}

export function CustomSort() {
  const [items, setItems] = useState<Item[]>([])
  const [sortIterator, setSortIterator] = useState(0)
  const [loading, setLoading] = useState(false)

  async function fetchItems(direction?: SortOrder | 'RESET', by?: keyof Item) {
    setLoading(true)
    const fetchedItems = await getItems(direction, by)

    setItems(fetchedItems)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems('RESET')
  }, [])

  function reducer(sortState: SortState, sortAction: SortAction) {
    switch (sortAction.type) {
      case 'ASC': {
        const { id } = sortAction.payload ?? { id: undefined }
        return {
          by: id,
          order: sortAction.type,
        }
      }
      case 'DSC': {
        const { id } = sortAction.payload ?? { id: undefined }
        return {
          by: id,
          order: sortAction.type,
        }
      }
      case 'RESET': {
        return {
          by: undefined,
          order: undefined,
        }
      }
      default:
        return sortState
    }
  }

  async function sort({ columnId, dispatch }: SortCallbackParams<Item>) {
    setLoading(true)

    const type = !(sortIterator % 2)
      ? 'DSC'
      : !(sortIterator % 3)
      ? 'RESET'
      : 'ASC'

    await fetchItems(type, columnId)
    dispatch({ type, payload: { id: columnId } })

    setSortIterator((sortIterator) => sortIterator + 1)
    setLoading(false)
  }

  const columns: Column<Item>[] = [
    {
      id: 'name',
      header: 'Product Name',
      sortable: true,
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
      sortable: true,
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      sortable: true,
    },
  ]

  return (
    <StatefulTable
      columns={columns}
      items={items}
      loading={loading}
      sort={{ directions: ['ASC', 'DSC'], reducer, sortCallback: sort }}
    />
  )
}
