import React, { useReducer } from 'react'

import { Box, Flex } from '@vtex/admin-primitives'
import { Button } from '../Button'
import { IconAdd } from '@vtex/admin-ui-icons'
import { Statement } from './components/Statement'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'
import { useFilterBar } from './useFilterBar'
import {
  FilterConditionProps,
  FilterConjunction,
  FilterBarProps,
  FilterProps,
} from './typings'
import { FilterBarProvider } from './context'

export function FilterBar<T>(props: FilterBarProps<T>) {
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

  const handleValueChange = (value: T | undefined, index: number) =>
    dispatch({
      type: 'value',
      value,
      index,
      handleStatementChange,
    })

  const handleFilterChange = (filter: FilterProps<T>, index: number) =>
    dispatch({
      type: 'filter',
      filter,
      index,
      handleStatementChange,
    })

  const handleConditionChange = (
    condition: FilterConditionProps,
    index: number
  ) =>
    dispatch({
      type: 'condition',
      condition: condition,
      index,
      handleStatementChange,
    })

  const handleConjunctionChange = (conjunction: FilterConjunction) =>
    dispatch({
      type: 'conjunction',
      conjunction,
      handleStatementChange,
    })

  return (
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
      <Box csx={{ border: 'default' }} {...htmlProps}>
        {statements.length === 0 ? (
          <Box
            csx={{
              themeKey: 'components.filterBar.statements-container-empty',
            }}
          >
            <Paragraph>{label}</Paragraph>
          </Box>
        ) : (
          <Box csx={{ themeKey: 'components.filterBar.statements-container' }}>
            <Set orientation="vertical" spacing={2}>
              {statements.map((statement, index) => {
                return (
                  <Statement
                    key={index}
                    index={index}
                    conjunction={conjunction ?? initialConjunction}
                    statement={statement}
                  />
                )
              })}
            </Set>
          </Box>
        )}
        <Flex csx={{ themeKey: 'components.filterBar.footer' }}>
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
        </Flex>
      </Box>
    </FilterBarProvider>
  )
}
