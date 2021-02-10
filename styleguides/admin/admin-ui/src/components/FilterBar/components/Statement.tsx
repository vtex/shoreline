import React from 'react'
import { IconAction, IconDelete, IconDuplicate } from '@vtex/admin-ui-icons'
import { get } from '@vtex/admin-core'

import { Set } from '../../Set'
import { FilterProps, StatementProps, ConjunctionProps } from '../index'
import { Flex } from '../../Flex'
import { Button } from '../../Button'
import { ResolveFilterArgs } from '../resolvers/core'
import { Box } from '../../Box'
import { Menu } from '../../Menu'
import { Dropdown, DropdownProps, useDropdownState } from '../../Dropdown'
import { useHandleStateContext } from '../context'

export interface NewStatementProps<T> {
  filters: FilterProps<T>[]
  statement: StatementProps<T>
  conjunction: ConjunctionProps
  index: number
  resolveValue: (
    args: Pick<
      ResolveFilterArgs<T>,
      'statement' | 'index' | 'handleValueChange'
    >
  ) => React.ReactNode
}

export function Statement<T>(props: NewStatementProps<T>) {
  const { filters, statement, index, conjunction, resolveValue } = props

  const {
    handleConjunctionChange,
    handleConditionChange,
    handleFilterChange,
    handleValueChange,
    handleDeleteStatement,
    handleDuplicateStatement,
  } = useHandleStateContext()

  const value = resolveValue({
    statement,
    index,
    handleValueChange,
  })

  const filtersState = useDropdownState({
    items: filters,
    selectedItem: statement.filter,
    onSelectedItemChange: ({ selectedItem: filter }) => {
      if (filter) {
        handleFilterChange(filter, index)
        handleConditionChange(filter.conditions[0], index)
        handleValueChange(undefined, index)
      }
    },
  })

  const conditions = filtersState.selectedItem?.conditions ?? []

  const conditionsState = useDropdownState({
    items: filtersState.selectedItem?.conditions ?? [],
    selectedItem: statement.condition,
    onSelectedItemChange: ({ selectedItem: condition }) => {
      if (condition) {
        handleConditionChange(condition, index)
      }
    },
  })

  const conjunctionMessage = index === 0 ? 'Where' : conjunction

  return (
    <Flex justify="space-between" styles={{ width: '100%' }} key={index}>
      <Set
        spacing={2}
        styleOverrides={{ '> div:nth-child(n+2)': { minWidth: 150 } }}
      >
        {index === 1 ? (
          <SelectConjunction
            conjunction={conjunction}
            handleConjunctionChange={handleConjunctionChange}
          />
        ) : (
          <Box styles={{ paddingLeft: 3, width: 100 }}>
            {conjunctionMessage}
          </Box>
        )}

        <StatementDropdown
          state={filtersState}
          renderItem={(item) => get(item, 'label', undefined)}
          label="Filter"
          items={filters}
          variant="adaptative-dark"
        />
        <StatementDropdown
          renderItem={(item) => get(item, 'label', undefined)}
          state={conditionsState}
          label="Condition"
          items={conditions}
          variant="adaptative-dark"
        />
        {value}
      </Set>

      <Menu
        aria-label={`${index}-filter-menu`}
        hideOnClick
        disclosure={
          <Button
            variant="adaptative-dark"
            styleOverrides={{ color: 'dark.secondary' }}
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
          onClick={() => {
            handleDeleteStatement(index)
            console.log(statement)
          }}
          icon={<IconDelete />}
        >
          Delete
        </Menu.Item>
      </Menu>
    </Flex>
  )
}

interface SelectConjunctionProps {
  conjunction: ConjunctionProps
  handleConjunctionChange: (conjunction: ConjunctionProps) => void
}

function SelectConjunction(props: SelectConjunctionProps) {
  const { conjunction, handleConjunctionChange } = props
  const conjunctions = ['And', 'Or'] as ConjunctionProps[]

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
    <StatementDropdown
      state={conjunctionState}
      items={conjunctions}
      label="Conjunction"
      variant="adaptative-dark"
      styleOverrides={{ width: 100 }}
    />
  )
}

function StatementDropdown<T>(props: DropdownProps<T>) {
  const { styleOverrides, ...restProps } = props

  return (
    <Dropdown
      variant="adaptative-dark"
      {...restProps}
      styleOverrides={{
        width: '100%',
        bg: 'light.primary',
        border: 'default',
        color: 'dark.secondary',
        div: {
          justifyContent: 'space-between',
        },
        ...styleOverrides,
      }}
    />
  )
}
