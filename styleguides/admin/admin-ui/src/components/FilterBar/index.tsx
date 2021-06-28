import React from 'react'

import { Box } from '@vtex/admin-primitives'
import { IconDuplicate, IconDelete, IconAdd } from '@vtex/admin-ui-icons'

import { Set } from '../Set'
import { Button } from '../Button'
import { Content, Statement, Footer } from './components'
import {
  FilterBarProps,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
} from './typings'
import { Menu } from '../Menu'
import { baseResolvers } from './resolvers/base'
import { useFilterBarState } from './useFilterBarState'
import { StatementDropdown, StatementDropdownProps } from './components'

export function FilterBar<T, V extends { value: T }>(
  props: FilterBarProps<T, V>
) {
  const {
    state: {
      conjunction,
      applied,
      statements,
      filters,
      onApply,
      addStatement,
      deleteStatement,
      applyFilters,
      duplicateStatement,
      changeValue,
      changeFilter,
      changeCondition,
      changeConjunction,
      resetFilters,
    },
    conjunctions,
    resolvers = baseResolvers<V>(),
    label,
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
                      changeConjunction(selectedItem)
                    }
                  }}
                />

                <Statement.Filter
                  label={filterLabel}
                  items={filters}
                  selectedItem={statement.filter}
                  handleItemChange={({ selectedItem: filter }) => {
                    if (!filter) return

                    changeFilter(filter, index)
                  }}
                />

                <Statement.Conditions
                  label={conditionLabel}
                  items={statement.filter.conditions}
                  selectedItem={statement.condition}
                  handleItemChange={({ selectedItem: condition }) => {
                    if (!condition) return

                    changeCondition(condition, index)
                  }}
                />

                <Statement.Value
                  resolvers={resolvers}
                  statement={statement}
                  index={index}
                  handleValueChange={changeValue}
                />
              </Set>
              <Statement.Menu
                baseId="statement-menu"
                aria-label={`${statementMenuLabel} ${index}`}
              >
                <Menu.Item
                  onClick={() => duplicateStatement(index)}
                  icon={<IconDuplicate />}
                >
                  {duplicateStatementLabel}
                </Menu.Item>
                <Menu.Item
                  onClick={() => deleteStatement(index)}
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
          onClick={addStatement}
        >
          {addFilterLabel}
        </Button>
        <Set>
          <Button
            size="small"
            variant="adaptative-dark"
            disabled={statements.length === 0}
            onClick={resetFilters}
          >
            {clearFilterLabel}
          </Button>
          <Button
            size="small"
            disabled={applied}
            onClick={() => {
              applyFilters()
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

export {
  useFilterBarState,
  StatementDropdown,
  StatementDropdownProps,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
  FilterBarProps,
}
