import React, { useCallback, useReducer } from 'react'

import { Box } from '@vtex/admin-primitives'
import { IconDuplicate, IconDelete, IconAdd } from '@vtex/admin-ui-icons'

import { Set } from '../Set'
import { Button } from '../Button'
import { Content, Statement, Footer } from './components'
import {
  Condition,
  FilterBarProps,
  Filter,
  ReducerFilters,
  Conjunction,
} from './typings'
import { Menu } from '../Menu'
import { Action, defaultReducer } from './reducer'
import { baseResolvers } from './resolvers/base'

export function FilterBar<T, V extends { value: T }>(props: FilterBarProps<V>) {
  const {
    conjunction: initialConjunction,
    conjunctions,
    statements: initialStatements = [],
    filters,
    resolvers = baseResolvers<V>(),
    label,
    onApply,
    csx = {},
    internalLabels: {
      conjunctionLabel,
      filterLabel,
      conditionLabel,
      addFilterLabel,
      statementMenuLabel,
      applyFilterLabel,
      clearFilterLabel,
      duplicateStatementLabel,
      deleteStatementLabel,
      whereStatementLabel,
    },
    ...htmlProps
  } = props

  const reducer = useCallback(
    (state: ReducerFilters<V>, action: Action<V>) =>
      defaultReducer(state, action),
    [defaultReducer]
  )

  const initialState = {
    conjunction: initialConjunction,
    statements: initialStatements,
    applied: true,
  }

  const [{ conjunction, statements, applied }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const handleNewStatement = () =>
    dispatch({
      type: 'newStatement',
      filter: filters[0],
    })

  const handleApply = () =>
    dispatch({
      type: 'apply',
    })

  const handleDeleteStatement = (index: number) =>
    dispatch({
      type: 'deleteStatement',
      index,
    })

  const handleDuplicateStatement = (index: number) =>
    dispatch({
      type: 'duplicateStatement',
      index,
    })

  const handleFiltersReset = (conjunction: Conjunction) =>
    dispatch({
      type: 'filtersReset',
      conjunction,
    })

  const handleValueChange = (value: V, index: number) =>
    dispatch({
      type: 'value',
      value,
      index,
    })

  const handleFilterChange = (filter: Filter<V>, index: number) =>
    dispatch({
      type: 'filter',
      filter,
      index,
    })

  const handleConditionChange = (condition: Condition, index: number) =>
    dispatch({
      type: 'condition',
      condition: condition,
      index,
    })

  const handleConjunctionChange = (conjunction: Conjunction) =>
    dispatch({
      type: 'conjunction',
      conjunction,
    })

  return (
    <Box
      csx={{ border: 'default', bg: 'sidebar.light', ...csx }}
      {...htmlProps}
    >
      <Content empty={statements.length === 0} label={label}>
        {statements.map((statement, index) => {
          return (
            <Statement key={`filter-statement-${index}`}>
              <Set spacing={2}>
                <Statement.Conjunction
                  label={conjunctionLabel}
                  whereLabel={whereStatementLabel}
                  selectedItem={conjunction}
                  index={index}
                  items={conjunctions}
                  handleItemChange={({ selectedItem }) => {
                    if (selectedItem) {
                      handleConjunctionChange(selectedItem)
                    }
                  }}
                />

                <Statement.Filter
                  label={filterLabel}
                  items={filters}
                  selectedItem={statement.filter}
                  handleItemChange={({ selectedItem: filter }) => {
                    if (!filter) return

                    handleFilterChange(filter, index)
                  }}
                />

                <Statement.Conditions
                  label={conditionLabel}
                  items={statement.filter.conditions}
                  selectedItem={statement.condition}
                  handleItemChange={({ selectedItem: condition }) => {
                    if (!condition) return

                    handleConditionChange(condition, index)
                  }}
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
                aria-label={`${statementMenuLabel} ${index}`}
              >
                <Menu.Item
                  onClick={() => handleDuplicateStatement(index)}
                  icon={<IconDuplicate />}
                >
                  {duplicateStatementLabel}
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleDeleteStatement(index)}
                  icon={<IconDelete />}
                >
                  {deleteStatementLabel}
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
          {addFilterLabel}
        </Button>
        <Set>
          <Button
            size="small"
            variant="adaptative-dark"
            disabled={statements.length === 0}
            onClick={() => handleFiltersReset(initialConjunction)}
          >
            {clearFilterLabel}
          </Button>
          <Button
            size="small"
            disabled={applied}
            onClick={() => {
              handleApply()
              onApply({ conjunction, statements })
            }}
          >
            {applyFilterLabel}
          </Button>
        </Set>
      </Footer>
    </Box>
  )
}

export { StatementDropdown, StatementDropdownProps } from './components'
