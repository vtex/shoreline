import React, { useEffect, useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { StatefulTable } from '../index'

export default {
  title: 'admin-ui/Table/Pagination',
  component: StatefulTable,
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

  return (
    <StatefulTable
      columns={[
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
      ]}
      items={items}
      length={5}
    />
  )
}
const customPaginationTableSize = 5

export function CustomPagination() {
  const [{ items, total }, setItems] = useState<GetItemsReturn>({
    total: 0,
    items: [],
  })
  const [loading, setLoading] = useState(false)
  const [{ range, currentPage }, setPagination] = useState<{
    range: [number, number]
    currentPage: number
  }>({ range: [1, customPaginationTableSize], currentPage: 1 })

  async function fetchItems(start: number, end: number) {
    setLoading(true)
    const fetchedItems = await getItems(start, end)

    setItems(fetchedItems)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems(1, 5)
  }, [])

  return (
    <StatefulTable
      columns={[
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
      ]}
      items={items}
      totalAmountOfItems={total}
      loading={loading}
      length={customPaginationTableSize}
      manualPagination={range}
      paginationCallback={async ({ type }) => {
        if (type === 'next') {
          const newPage = currentPage + 1

          const newRange: [number, number] = [
            range[1] + 1,
            customPaginationTableSize * newPage,
          ]

          await fetchItems(...newRange)

          setPagination((previousState) => ({
            ...previousState,
            range: newRange,
            currentPage: currentPage + 1,
          }))
          return
        }

        const newRange: [number, number] = [
          range[0] - customPaginationTableSize,
          range[0] - 1,
        ]

        await fetchItems(...newRange)

        setPagination((previousState) => ({
          ...previousState,
          range: newRange,
          currentPage: previousState.currentPage + 1,
        }))
      }}
    />
  )
}
