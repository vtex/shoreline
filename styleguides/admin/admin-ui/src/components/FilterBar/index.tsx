import React, { useCallback, useReducer } from 'react'

import { Box } from '@vtex/admin-primitives'
import { IconDuplicate, IconDelete, IconAdd } from '@vtex/admin-ui-icons'

import { Set } from '../Set'
import { Button } from '../Button'
import { Content, Statement, Footer } from './components'
import {
  Condition,
  Conjunction,
  FilterBarProps,
  Filter,
  Filters,
} from './typings'
import { Menu } from '../Menu'
import { Action, defaultReducer } from './reducer'
import { baseResolvers } from './resolvers/base'

export function FilterBar<T, V extends { value: T }>(props: FilterBarProps<V>) {
  const {
    conjunction: initialConjunction = 'And',
    statements: initialStatements = [],
    filters,
    resolvers = baseResolvers<V>(),
    label,
    onStatementChange,
    csx = {},
    ...htmlProps
  } = props

  const reducer = useCallback(
    (state: Filters<V>, action: Action<V>) => defaultReducer(state, action),
    [defaultReducer]
  )

  const initialState = {
    conjunction: initialConjunction,
    statements: initialStatements,
  }

  const [{ conjunction, statements }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const handleNewStatement = () =>
    dispatch({
      type: 'newStatement',
      filter: filters[0],
      onStatementChange,
    })

  const handleDeleteStatement = (index: number) =>
    dispatch({
      type: 'deleteStatement',
      index,
      onStatementChange,
    })

  const handleDuplicateStatement = (index: number) =>
    dispatch({
      type: 'duplicateStatement',
      index,
      onStatementChange,
    })

  const handleFiltersReset = () =>
    dispatch({
      type: 'filtersReset',
      onStatementChange,
    })

  const handleValueChange = (value: V, index: number) =>
    dispatch({
      type: 'value',
      value,
      index,
      onStatementChange,
    })

  const handleFilterChange = (filter: Filter<V>, index: number) =>
    dispatch({
      type: 'filter',
      filter,
      index,
      onStatementChange,
    })

  const handleConditionChange = (condition: Condition, index: number) =>
    dispatch({
      type: 'condition',
      condition: condition,
      index,
      onStatementChange,
    })

  const handleConjunctionChange = (conjunction: Conjunction) =>
    dispatch({
      type: 'conjunction',
      conjunction,
      onStatementChange,
    })

  return (
    <Box
      csx={{ border: 'default', bg: 'light.secondary', ...csx }}
      {...htmlProps}
    >
      <Content empty={statements.length === 0} label={label}>
        {statements.map((statement, index) => {
          return (
            <Statement key={`filter-statement-${index}`}>
              <Set spacing={2}>
                <Statement.Conjunction
                  label="Conjunction"
                  selectedItem={conjunction}
                  index={index}
                  items={['And', 'Or']}
                  handleItemChange={({ selectedItem }) => {
                    if (selectedItem) {
                      handleConjunctionChange(selectedItem)
                    }
                  }}
                />

                <Statement.Filter
                  label="Filter"
                  items={filters}
                  selectedItem={statement.filter}
                  handleItemChange={({ selectedItem: filter }) => {
                    if (!filter) return

                    handleFilterChange(filter, index)
                  }}
                />

                <Statement.Conditions
                  selectedItem={statement.condition}
                  handleItemChange={({ selectedItem: condition }) => {
                    if (!condition) return

                    handleConditionChange(condition, index)
                  }}
                  label="Condition"
                  items={statement.filter.conditions}
                />

                <Statement.Value
                  resolvers={resolvers}
                  statement={statement}
                  index={index}
                  handleValueChange={handleValueChange}
                />
              </Set>
              <Statement.Menu
                baseId="statement-menu"
                aria-label={`statement-menu-${index}`}
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
              </Statement.Menu>
            </Statement>
          )
        })}
      </Content>

      <Footer>
        <Button
          size="small"
          variant="tertiary"
          icon={<IconAdd />}
          onClick={handleNewStatement}
        >
          Add Filter
        </Button>
        <Button
          size="small"
          variant="adaptative-dark"
          csx={{ color: 'dark.secondary' }}
          onClick={handleFiltersReset}
        >
          Reset Filters
        </Button>
      </Footer>
    </Box>
  )
}

export { StatementDropdown, StatementDropdownProps } from './components'
