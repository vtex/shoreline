import React, { useEffect, useMemo, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { useDebounce } from 'use-debounce'
import { Flex } from '@vtex/admin-primitives'

import { FilterBar } from '../index'
import { StatefulTable } from '../../PowerfulTable'
import { Statement, Filters } from '../typings'
import { AbstractInput } from '../../AbstractInput'
import { ResolverRenderProps } from '../resolvers/core'
import faker from 'faker'

export default {
  title: 'admin-ui/FilterBar/Table',
  component: FilterBar,
} as Meta

interface Item {
  id: string
  productName: string
  inStock: number
  price: number
}

function FilterInput(statement: ResolverRenderProps<FiltersType, null>) {
  const {
    statement: { target = { value: '' } },
    handleValueChange,
    index,
  } = statement

  const { value } = target

  if (typeof value !== 'string') return <></>

  const [inputValue, setInputValue] = useState(value)
  const [newValue] = useDebounce(inputValue, 300)

  useEffect(() => {
    handleValueChange({ value: newValue }, index)
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

  function filterByProduct(statement: Statement<FiltersType>, item: any) {
    const { condition, target: { value } = { value: '' } } = statement

    if (typeof value !== 'string') return

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
  function filterByPrice(statement: Statement<FiltersType>, item: any) {
    const { condition, target } = statement

    switch (condition.label) {
      case 'is smaller than': {
        return target && item.price < target.value
      }
      case 'is bigger than': {
        return target && item.price > target.value
      }
      default:
        return true
    }
  }

  const filter = (filters: Filters<FiltersType>) => {
    const { conjunction, statements } = filters
    const filteredItems = products.filter((item) => {
      const conditions = statements.map((statement) => {
        const {
          filter: { id },
        } = statement

        switch (id) {
          case 'productName': {
            return filterByProduct(statement, item)
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
        conjunction.value === 'and'
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
          filters={[
            {
              id: 'price',
              label: 'Price',
              conditions: [
                { label: 'is bigger than', id: '3' },
                { label: 'is smaller than', id: '4' },
              ],
              resolver: {
                type: 'simple',
                defaultValue: { value: 100 },
                items: [
                  { value: 1 },
                  { value: 10 },
                  { value: 50 },
                  { value: 100 },
                  { value: 250 },
                  { value: 500 },
                ],
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
                defaultValue: { value: '' },
                render: (props) => {
                  return <FilterInput {...props} />
                },
              },
            },
          ]}
          onApply={(filters) => {
            console.log(filters)
            filter(filters)
          }}
          conjunction={{ label: 'And', value: 'and' }}
          conjunctions={[
            { label: 'And', value: 'and' },
            { label: 'Or', value: 'or' },
          ]}
          conjunctionLabel="Conjunction"
          filterLabel="Filter"
          conditionLabel="Condition"
          statementMenuLabel="Statement Menu"
          applyFilterLabel="Apply"
          addFilterLabel="Add Filter"
          clearFilterLabel="Clear Filters"
          deleteStatementLabel="Delete"
          duplicateStatementLabel="Duplicate"
          whereStatementLabel="Where"
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

type FiltersType = { value: number } | { value: string }
