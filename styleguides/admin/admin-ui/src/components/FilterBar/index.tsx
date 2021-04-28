import React, { useReducer } from 'react'

import { Box } from '@vtex/admin-primitives'
import { IconAdd } from '@vtex/admin-ui-icons'

import { Button } from '../Button'
import { Body, Footer } from './components'
import { useFilterBar } from './useFilterBar'
import { Condition, Conjunction, FilterBarProps, Filter } from './typings'
import { FilterBarProvider } from './context'

export function FilterBar<T, V extends { value: T }>(props: FilterBarProps<V>) {
  const {
    reducer,
    conjunction: initialConjunction,
    statements: initialStatements,
    filters,
    resolvers,
    label,
    handleStatementChange,
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
    <Box csx={{ border: 'default' }} {...htmlProps}>
      <FilterBarProvider
        filters={filters}
        resolvers={resolvers}
        handleValueChange={handleValueChange}
        handleConditionChange={handleConditionChange}
        handleConjunctionChange={handleConjunctionChange}
        handleDeleteStatement={handleDeleteStatement}
        handleFilterChange={handleFilterChange}
        handleDuplicateStatement={handleDuplicateStatement}
      >
        <Body empty={statements.length === 0} label={label}>
          {statements.map((statement, index) => {
            return (
              <Body.Statement
                key={`filter-statement-${index}`}
                index={index}
                conjunction={conjunction}
                statement={statement}
              />
            )
          })}
        </Body>

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
      </FilterBarProvider>
    </Box>
  )
}
