import React, { useReducer } from 'react'

import { Box } from '@vtex/admin-primitives'
import { IconDuplicate, IconDelete, IconAdd } from '@vtex/admin-ui-icons'

import { Set } from '../Set'
import { Button } from '../Button'
import { Content, Statement, Footer } from './components'
import { useFilterBar } from './useFilterBar'
import { Condition, Conjunction, FilterBarProps, Filter } from './typings'
import { Menu } from '../Menu'

export function FilterBar<T, V extends { value: T }>(props: FilterBarProps<V>) {
  const {
    reducer,
    conjunction: initialConjunction,
    statements: initialStatements,
    filters,
    resolvers,
    label,
    handleStatementChange,
    csx = {},
    ...htmlProps
  } = useFilterBar(props)

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
      handleStatementChange,
    })

  const handleDeleteStatement = (index: number) =>
    dispatch({
      type: 'deleteStatement',
      index,
      handleStatementChange,
    })

  const handleDuplicateStatement = (index: number) =>
    dispatch({
      type: 'duplicateStatement',
      index,
      handleStatementChange,
    })

  const handleFiltersReset = () =>
    dispatch({
      type: 'filtersReset',
      handleStatementChange,
    })

  const handleValueChange = (value: V, index: number) =>
    dispatch({
      type: 'value',
      value,
      index,
      handleStatementChange,
    })

  const handleFilterChange = (filter: Filter<V>, index: number) =>
    dispatch({
      type: 'filter',
      filter,
      index,
      handleStatementChange,
    })

  const handleConditionChange = (condition: Condition, index: number) =>
    dispatch({
      type: 'condition',
      condition: condition,
      index,
      handleStatementChange,
    })

  const handleConjunctionChange = (conjunction: Conjunction) =>
    dispatch({
      type: 'conjunction',
      conjunction,
      handleStatementChange,
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
              <Statement.Menu aria-label={`statement-menu-${index}`}>
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
