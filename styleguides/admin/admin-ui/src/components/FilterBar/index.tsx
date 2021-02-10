import React, { useCallback, useReducer } from 'react'

import { Box } from '../Box'
import { Button } from '../Button'
import { IconAdd } from '@vtex/admin-ui-icons'
import { Statement } from './components/Statement'
import { Set } from '../Set'
import { baseResolvers, BaseResolvers } from './resolvers/base'
import { Flex } from '../Flex'
import { Paragraph } from '../Paragraph'
import { HandleStateProvider } from './context'
import { Resolver } from './resolvers/core'
import { useFilterBar } from './useFilterBar'

export function FilterBar<T>(props: FilterBarProps<T>) {
  const {
    filters = [],
    statements: initialStatements = [],
    handleStatementChange,
    conjunction: initialConjunction = 'And',
    label,
    resolvers = baseResolvers<T>(),
  } = props

  const [
    { conjunction = initialConjunction, statements },
    dispatch,
  ] = useReducer(
    useCallback(
      (state: StatementsProps<T>, action: Action<T>) => reducer(state, action),
      []
    ),
    { conjunction: initialConjunction, statements: initialStatements }
  )

  const { resolveValue } = useFilterBar<T>({ resolvers })

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

  const handleValueChange = (value: T, index: number) =>
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

  const handleConditionChange = (condition: ConditionProps, index: number) =>
    dispatch({
      type: 'condition',
      condition: condition,
      index,
      handleStatementChange,
    })

  const handleConjunctionChange = (conjunction: ConjunctionProps) =>
    dispatch({
      type: 'conjunction',
      conjunction,
      handleStatementChange,
    })

  return (
    <HandleStateProvider
      {...{
        handleValueChange,
        handleConditionChange,
        handleConjunctionChange,
        handleDeleteStatement,
        handleFilterChange,
        handleDuplicateStatement,
      }}
    >
      <Box styles={{ border: 'default' }}>
        {statements.length === 0 ? (
          <Box styles={{ padding: 4, paddingLeft: 6, bg: 'light.secondary' }}>
            <Paragraph>{label}</Paragraph>
          </Box>
        ) : (
          <Box styles={{ padding: 2, paddingLeft: 4, bg: 'light.secondary' }}>
            <Set orientation="vertical" spacing={2}>
              {statements.map((statement, index) => {
                return (
                  <Statement
                    key={index}
                    index={index}
                    conjunction={conjunction}
                    statement={statement}
                    filters={filters}
                    resolveValue={resolveValue}
                  />
                )
              })}
            </Set>
          </Box>
        )}
        <Flex
          justify="space-between"
          styles={{ paddingY: 2, paddingX: 3, border: 'divider-top' }}
        >
          <Button
            size="small"
            variant="tertiary"
            icon={<IconAdd />}
            onClick={() => handleNewStatement()}
          >
            Add Filter
          </Button>
          <Button
            size="small"
            variant="adaptative-dark"
            styleOverrides={{ color: 'dark.secondary' }}
            onClick={() => handleFiltersReset()}
          >
            Reset Filters
          </Button>
        </Flex>
      </Box>
    </HandleStateProvider>
  )
}

function reducer<T>(
  state: StatementsProps<T>,
  action: Action<T>
): StatementsProps<T> {
  switch (action.type) {
    case 'conjunction': {
      const { conjunction, handleStatementChange } = action
      const { statements } = state

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filter': {
      const { filter, handleStatementChange, index } = action
      const { conjunction, statements: currentStatements } = state

      let statements = currentStatements
      statements[index] = { ...currentStatements[index], filter }

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'condition': {
      const { condition, handleStatementChange, index } = action
      const { conjunction, statements } = state

      let nextState = statements
      nextState[index] = { ...statements[index], condition }

      handleStatementChange({ conjunction, statements: nextState })

      return { conjunction, statements: nextState }
    }
    case 'value': {
      const { value, handleStatementChange, index } = action
      const { conjunction, statements: currentStatements } = state

      let statements = currentStatements
      statements[index] = { ...currentStatements[index], value }

      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
    case 'newStatement': {
      const { handleStatementChange, filter } = action
      const { conjunction, statements } = state

      const emptyStatement = {
        filter: filter,
        condition: filter.conditions[0],
      } as StatementProps<T>

      const nextState = {
        conjunction,
        statements: [...statements, emptyStatement],
      }

      handleStatementChange(nextState)

      return nextState
    }
    case 'filtersReset': {
      const { handleStatementChange } = action

      const nextState = {
        conjunction: 'And',
        statements: [],
      } as StatementsProps<T>

      handleStatementChange(nextState)

      return nextState
    }
    case 'duplicateStatement': {
      const { index, handleStatementChange } = action
      const { conjunction, statements } = state

      const duplicatedStatement = statements[index]

      const nextState = {
        conjunction,
        statements: [...statements, duplicatedStatement],
      }

      handleStatementChange(nextState)

      return nextState
    }
    case 'deleteStatement': {
      const { index, handleStatementChange } = action
      const { conjunction, statements } = state

      statements.splice(index, 1)
      const nextState = { conjunction, statements }

      handleStatementChange(nextState)

      return nextState
    }
  }
}

export type Action<T> =
  | {
      type: 'conjunction'
      conjunction: ConjunctionProps
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'filter'
      filter: FilterProps<T>
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'condition'
      condition: ConditionProps
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'value'
      value: T
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'newStatement'
      filter: FilterProps<T>
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'filtersReset'
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'duplicateStatement'
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }
  | {
      type: 'deleteStatement'
      index: number
      handleStatementChange: (statement: StatementsProps<T>) => void
    }

export interface FilterBarProps<T> {
  handleStatementChange: (statements: StatementsProps<T>) => void
  conjunction?: ConjunctionProps
  statements?: StatementProps<T>[]
  filters: FilterProps<T>[]
  label: string
  resolvers?: Record<string, Resolver<T>>
}

export type ConjunctionProps = 'And' | 'Or'

export interface FilterProps<T, R = BaseResolvers<T>> {
  label: string
  conditions: ConditionProps[]
  resolver: R
}

export interface ConditionProps {
  label: string
  id: string
}

export interface StatementsProps<T> {
  statements: StatementProps<T>[]
  conjunction?: ConjunctionProps
}

export interface StatementProps<T, R = BaseResolvers<T>> {
  condition: ConditionProps
  value: T
  filter: FilterProps<T, R>
}
