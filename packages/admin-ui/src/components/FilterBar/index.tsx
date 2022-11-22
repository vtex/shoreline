import React from 'react'
import { IconCopy, IconTrash, IconPlus } from '@vtex/phosphor-icons'

import { Box } from '../../box'
import { Inline } from '../../inline'
import { Button } from '../../button'
import type { StatementDropdownProps } from './components'
import { Content, Statement, Footer, StatementDropdown } from './components'
import type {
  FilterBarProps,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
} from './typings'
import { MenuItem, Menu, MenuButton } from '../../menu'

import { baseResolvers } from './resolvers/base'
import { useFilterBarState } from './useFilterBarState'

/**
 * @deprecated Use composable filters instead
 * @see https://admin-ui.vercel.app/guidelines/components/filter
 */
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
      csx={{
        border: '$neutral',
        bg: '$secondary',
        borderRadius: '$border-radius-base',
        ...csx,
      }}
      {...htmlProps}
    >
      <Content empty={statements.length === 0} label={label}>
        {statements.map((statement, index) => {
          return (
            <Statement key={`filter-statement-${index}`}>
              <Inline align="center">
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
              </Inline>
              <Statement.Menu>
                {(menuState) => {
                  return (
                    <>
                      <MenuButton
                        state={menuState}
                        variant="neutralTertiary"
                        aria-label={`${statementMenuLabel} ${index}`}
                      />
                      <Menu
                        state={menuState}
                        aria-label={`${statementMenuLabel} ${index}`}
                      >
                        <MenuItem
                          onClick={() => duplicateStatement(index)}
                          icon={<IconCopy />}
                          label={duplicateStatementLabel}
                        />
                        <MenuItem
                          onClick={() => deleteStatement(index)}
                          icon={<IconTrash />}
                          label={deleteStatementLabel}
                        />
                      </Menu>
                    </>
                  )
                }}
              </Statement.Menu>
            </Statement>
          )
        })}
      </Content>

      <Footer>
        <Button variant="tertiary" icon={<IconPlus />} onClick={addStatement}>
          {addFilterLabel}
        </Button>
        <Inline align="center">
          <Button
            variant="neutralTertiary"
            disabled={statements.length === 0}
            onClick={resetFilters}
          >
            {clearFilterLabel}
          </Button>
          <Button
            disabled={applied}
            onClick={() => {
              applyFilters()
              onApply({ conjunction, statements })
            }}
          >
            {applyFilterLabel}
          </Button>
        </Inline>
      </Footer>
    </Box>
  )
}

export { useFilterBarState, StatementDropdown }
export type {
  StatementDropdownProps,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
  FilterBarProps,
}
