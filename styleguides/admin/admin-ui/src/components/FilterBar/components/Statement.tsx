import React from 'react'
import { IconAction, IconDelete, IconDuplicate } from '@vtex/admin-ui-icons'
import { get, useSystem } from '@vtex/admin-core'

import { Set } from '../../Set'
import { FilterStatement, FilterConjunction } from '../typings'
import { Flex, Box } from '@vtex/admin-primitives'
import { Button } from '../../Button'
import { ResolvedValue } from '../resolvers/core'
import { Menu } from '../../Menu'
import { Dropdown, DropdownProps, useDropdownState } from '../../Dropdown'
import { useFilterBarContext } from '../context'

export function Statement<T>(props: NewStatementProps<T>) {
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
      handleConditionChange(filter.conditions[0], index)
      handleValueChange(undefined, index)
    },
  })

  const conditions = statement.filter.conditions

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
        <StatementDropdown
          state={filtersState}
          label="Filter"
          items={filters}
        />
        <StatementDropdown
          state={conditionsState}
          label="Condition"
          items={conditions}
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

export interface NewStatementProps<T> {
  statement: FilterStatement<T>
  conjunction: FilterConjunction
  index: number
}

function ConjunctionDropdown(props: ConjunctionDropdownProps) {
  const { conjunction, handleConjunctionChange } = props
  const { stylesOf } = useSystem()

  const conjunctions = ['And', 'Or'] as FilterConjunction[]

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
    <Dropdown
      state={conjunctionState}
      items={conjunctions}
      label="Conjunction"
      variant="adaptative-dark"
      csx={{
        ...stylesOf('components.filterBar.dropdown'),
        minWidth: 100,
      }}
    />
  )
}

interface ConjunctionDropdownProps {
  conjunction: FilterConjunction
  handleConjunctionChange: (conjunction: FilterConjunction) => void
}

function StatementDropdown<T>(props: DropdownProps<T>) {
  const { stylesOf } = useSystem()

  return (
    <Dropdown
      {...props}
      variant="adaptative-dark"
      renderItem={(item) => (
        <Box csx={{ themeKey: 'components.filterBar.dropdown-label' }}>
          {get(item, 'label')}
        </Box>
      )}
      csx={{ ...stylesOf('components.filterBar.dropdown'), maxWidth: 150 }}
    />
  )
}
