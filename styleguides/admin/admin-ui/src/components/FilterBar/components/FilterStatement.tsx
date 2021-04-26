import React, { useMemo } from 'react'
import { IconAction, IconDelete, IconDuplicate } from '@vtex/admin-ui-icons'
import { Flex, Box } from '@vtex/admin-primitives'

import { Set } from '../../Set'
import { Statement, Conjunction } from '../typings'
import { Button } from '../../Button'
import { ResolvedValue } from '../resolvers/core'
import { Menu } from '../../Menu'
import { useDropdownState } from '../../Dropdown'
import { useFilterBarContext } from '../context'
import { FilterDropdown } from './FilterDropdown'

export function FilterStatement<T>(props: FilterStatementProps<T>) {
  const { statement, index, conjunction } = props

  const {
    filters,
    resolvers,
    handleConjunctionChange,
    handleConditionChange,
    handleFilterChange,
    handleValueChange,
    handleDeleteStatement,
    handleDuplicateStatement,
  } = useFilterBarContext<T>()

  const filtersState = useDropdownState({
    items: filters,
    selectedItem: statement.filter,
    onSelectedItemChange: ({ selectedItem: filter }) => {
      if (!filter) return

      handleFilterChange(filter, index)
    },
  })

  const conditions = useMemo(() => statement.filter.conditions, [])

  const conditionsState = useDropdownState({
    items: conditions,
    selectedItem: statement.condition,
    onSelectedItemChange: ({ selectedItem: condition }) => {
      if (!condition) return

      handleConditionChange(condition, index)
    },
  })

  return (
    <Flex justify="space-between" csx={{ width: '100%' }} key={index}>
      <Set
        spacing={2}
        csx={{
          '> div:nth-child(n+2)': { minWidth: 150, maxWidth: 150 },
          '> div:first-child': { minWidth: 100, maxWidth: 100 },
        }}
      >
        {index === 1 ? (
          <ConjunctionDropdown
            conjunction={conjunction}
            handleConjunctionChange={handleConjunctionChange}
          />
        ) : (
          <Box csx={{ paddingLeft: 3 }}>
            {index === 0 ? 'Where' : conjunction}
          </Box>
        )}
        <FilterDropdown
          state={filtersState}
          label="Filter"
          items={filters}
          csx={{ maxWidth: 150 }}
        />
        <FilterDropdown
          state={conditionsState}
          label="Condition"
          items={conditions}
          csx={{ maxWidth: 150 }}
        />
        <ResolvedValue
          resolvers={resolvers}
          statement={statement}
          index={index}
          handleValueChange={handleValueChange}
        />
      </Set>
      <Menu
        aria-label={`${index}-statement-menu`}
        hideOnClick
        disclosure={
          <Button
            variant="adaptative-dark"
            csx={{ color: 'dark.secondary' }}
            icon={<IconAction />}
          />
        }
      >
        <Menu.Item
          onClick={() => handleDuplicateStatement(index)}
          icon={<IconDuplicate />}
        >
          Duplicate
        </Menu.Item>
        <Menu.Item
          onClick={() => handleDeleteStatement(index)}
          icon={<IconDelete />}
        >
          Delete
        </Menu.Item>
      </Menu>
    </Flex>
  )
}

export interface FilterStatementProps<T> {
  /** Current statement */
  statement: Statement<T>
  /** Current conjunction */
  conjunction: Conjunction
  /** Current statement index on Statements array */
  index: number
}

function ConjunctionDropdown(props: ConjunctionDropdownProps) {
  const { conjunction, handleConjunctionChange } = props

  const conjunctions = ['And', 'Or'] as Conjunction[]

  const conjunctionState = useDropdownState({
    items: conjunctions,
    selectedItem: conjunction,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        handleConjunctionChange(selectedItem)
      }
    },
  })

  return (
    <FilterDropdown
      state={conjunctionState}
      items={conjunctions}
      label="Conjunction"
      csx={{ minWidth: 100 }}
    />
  )
}

interface ConjunctionDropdownProps {
  conjunction: Conjunction
  handleConjunctionChange: (conjunction: Conjunction) => void
}
