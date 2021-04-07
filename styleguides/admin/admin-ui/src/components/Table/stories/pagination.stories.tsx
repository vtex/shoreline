import React, { useEffect, useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import { Flex } from '@vtex/admin-primitives'
import faker from 'faker'

import { StatefulTable } from '../index'
import { usePagination } from '../../Pagination/usePagination'
import { Pagination } from '../../Pagination'

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

const customPaginationTableSize = 5

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

  const pagination = usePagination({
    size: 5,
  })

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
      items={items.slice(
        pagination.state.range[0] - 1,
        pagination.state.range[1]
      )}
      length={5}
    >
      <Flex csx={{ marginBottom: '1.5rem' }}>
        {/* Later this box should be the Toolbar component */}

        <Flex.Spacer />
        <Pagination
          pagination={pagination}
          total={items.length}
          preposition="of"
          subject="results"
          prevLabel="Back"
          nextLabel="Next"
        />
      </Flex>
    </StatefulTable>
  )
}

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
      loading={loading}
      length={customPaginationTableSize}
    >
      <Flex csx={{ marginBottom: '1.5rem' }}>
        {/* Later this box should be the Toolbar component */}

        <Flex.Spacer />
        <Pagination
          pagination={{
            state: { currentPage, range },
            paginate: async (type) => {
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
            },
          }}
          total={total}
          preposition="of"
          subject="results"
          prevLabel="Back"
          nextLabel="Next"
        />
      </Flex>
    </StatefulTable>
  )
}
