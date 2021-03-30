import React, { useEffect, useMemo, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { useDebounce } from 'use-debounce'

import { FilterBar } from '../index'
import { StatefulTable } from '../../Table'
import { FilterProps, FilterStatement, FilterStatements } from '../typings'
import { AbstractInput } from '../../AbstractInput'
import { ResolverRenderProps } from '../resolvers/core'
import { Flex } from '@vtex/admin-primitives'
import faker from 'faker'

export default {
  title: 'components/FilterBar/Table',
  component: FilterBar,
} as Meta

interface Item {
  id: string
  productName: string
  inStock: number
  price: number
}

function FilterInput(statement: ResolverRenderProps<string, null>) {
  const {
    statement: { value = '' },
    handleValueChange,
    index,
  } = statement

  const [inputValue, setInputValue] = useState(value)
  const [newValue] = useDebounce(inputValue, 300)

  useEffect(() => {
    handleValueChange(newValue, index)
  }, [newValue])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <AbstractInput
      id="test"
      value={inputValue}
      csx={{ bg: 'light.primary', height: 40, marginY: 0 }}
      onChange={(e) => setInputValue(e.target.value)}
    />
  )
}

export const Table: Story = () => {
  const products = useMemo<Item[]>(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        productName: faker.commerce.productName(),
        inStock: faker.random.number(),
        price: faker.random.number(500),
      }
    })
  }, [])

  const [items, setItems] = useState(products)

  function filterByProduct(statement: FilterStatement<string>, item: any) {
    const { condition, value = '' } = statement

    if (!value) return true

    switch (condition.label) {
      case 'is equal': {
        return item.productName.toLowerCase() === value.toLowerCase()
      }
      case 'is not equal': {
        return item.productName.toLowerCase() !== value.toLowerCase()
      }
      case 'contains': {
        return item.productName.toLowerCase().includes(value.toLowerCase())
      }
    }
  }
  function filterByPrice(statement: FilterStatement<FiltersType>, item: any) {
    const { condition, value } = statement

    switch (condition.label) {
      case 'is smaller than': {
        return value && item.price < value
      }
      case 'is bigger than': {
        return value && item.price > value
      }
      default:
        return true
    }
  }

  const filter = (s: FilterStatements<FiltersType>) => {
    const { conjunction, statements } = s
    const filteredItems = products.filter((item) => {
      const conditions = statements.map((statement) => {
        const {
          filter: { id },
        } = statement

        switch (id) {
          case 'productName': {
            return filterByProduct(statement as FilterStatement<string>, item)
          }
          case 'price': {
            return filterByPrice(statement, item)
          }
          default:
            return true
        }
      })

      if (conditions.length === 0) return true

      return conditions.reduce((accumulator, currentValue) =>
        conjunction === 'And'
          ? accumulator && currentValue
          : accumulator || currentValue
      )
    })

    setItems(filteredItems)
  }

  return (
    <Flex justify="center">
      <Flex direction="column" csx={{ width: 1000 }}>
        <FilterBar
          label="Use a filter to find products, create collections or generate a report"
          filters={
            [
              {
                id: 'price',
                label: 'Price',
                conditions: [
                  { label: 'is bigger than', id: '3' },
                  { label: 'is smaller than', id: '4' },
                ],
                resolver: {
                  type: 'simple',
                  accessor: 'value',
                  defaultValue: 100,
                  items: [1, 10, 50, 100, 250, 500],
                },
              },
              {
                id: 'productName',
                label: 'Product Name',
                conditions: [
                  { label: 'is equal', id: '1' },
                  { label: 'is not equal', id: '2' },
                  { label: 'contains', id: '2' },
                ],
                resolver: {
                  type: 'root',
                  defaultValue: '',
                  render: (props: ResolverRenderProps<string, null>) => {
                    return <FilterInput {...props} />
                  },
                },
              },
            ] as FilterProps<FiltersType>[]
          }
          handleStatementChange={(statements) => {
            console.log(statements)
            filter(statements)
          }}
        />
        <StatefulTable
          columns={[
            {
              id: 'productName',
              header: 'Product Name',
            },
            {
              id: 'inStock',
              header: 'In Stock',
            },
            {
              id: 'price',
              header: 'Price',
            },
          ]}
          items={items}
        />
      </Flex>
    </Flex>
  )
}

type FiltersType = number | string
