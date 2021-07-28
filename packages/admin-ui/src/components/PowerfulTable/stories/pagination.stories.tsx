import React, { useEffect, useMemo, useState } from 'react'
import type { Meta } from '@storybook/react'
import { Flex } from '@vtex/admin-primitives'
import faker from 'faker'

import { StatelessTable } from '../index'
import { usePaginationState, Pagination } from '../../Pagination'
import { useTableState } from '../../Table'

export default {
  title: 'admin-ui/PowerfulTable/Pagination',
  component: StatelessTable,
} as Meta

interface GetItemsReturn {
  items: Item[]
  total: number
}

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const size = 5

function getItems(start: number, end: number): Promise<GetItemsReturn> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [...Array(36).keys()]
          .map((id) => {
            return {
              id: `${id}`,
              name: faker.commerce.productName(),
              lastSale: faker.date.past().toDateString(),
              price: faker.commerce.price(),
            }
          })
          .slice(start - 1, end),
        total: 36,
      })
    }, 1000)
  })
}

export function Simple() {
  const items = useMemo(() => {
    return [...Array(36).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const paginationState = usePaginationState({
    size,
  })

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
    items: items.slice(paginationState.range[0] - 1, paginationState.range[1]),
    length: 5,
  })

  return (
    <StatelessTable state={tableState}>
      <StatelessTable.Section>
        <Flex.Spacer />
        <Pagination
          state={paginationState}
          total={items.length}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
        />
      </StatelessTable.Section>
    </StatelessTable>
  )
}

export function CustomPagination() {
  const [{ items, total }, setItems] = useState<GetItemsReturn>({
    total: 0,
    items: [],
  })

  const [loading, setLoading] = useState(false)

  const paginationState = usePaginationState({
    paginationReducer: (currentPaginationState, action) => {
      if (action.type === 'next') {
        const newPage = currentPaginationState.currentPage + 1

        const newRange: [number, number] = [
          currentPaginationState.range[1] + 1,
          action.tableSize * newPage,
        ]

        fetchItems(...newRange)

        return {
          ...currentPaginationState,
          range: newRange,
          currentPage: newPage,
        }
      }

      const newRange: [number, number] = [
        currentPaginationState.range[0] - action.tableSize,
        currentPaginationState.range[0] - 1,
      ]

      fetchItems(...newRange)

      return {
        ...currentPaginationState,
        range: newRange,
        currentPage: currentPaginationState.currentPage + 1,
      }
    },
    size,
  })

  async function fetchItems(start: number, end: number) {
    setLoading(true)
    const fetchedItems = await getItems(start, end)

    setItems(fetchedItems)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems(1, 5)
  }, [])

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
    items,
    loading,
    length: size,
  })

  return (
    <StatelessTable state={tableState}>
      <StatelessTable.Section>
        <Flex.Spacer />
        <Pagination state={paginationState} total={total} loading={loading} />
      </StatelessTable.Section>
    </StatelessTable>
  )
}
