import React from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { Box } from '../../Box'
import type { Conjunction } from '../typings'
import type { StatementDropdownProps } from './StatementDropdown'
import { StatementDropdown } from './StatementDropdown'
import { ResolvedValue } from '../resolvers/core'
import { StatementMenu } from './StatementMenu'

/**
 * Statement container
 */
const _Statement = jsx('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

/**
 * It renders either a Dropdown to select the FilterBar conjunction or the conjunction label.
 */
function StatementConjunction(props: StatementConjunctionProps) {
  const { index, whereLabel, selectedItem, handleItemChange, items, label } =
    props

  return index === 1 ? (
    <StatementDropdown
      label={label}
      selectedItem={selectedItem}
      handleItemChange={handleItemChange}
      items={items}
      csx={{ minWidth: 100, maxWidth: 100 }}
    />
  ) : (
    <Box csx={{ paddingLeft: 3, minWidth: 100, maxWidth: 100 }}>
      {index === 0 ? whereLabel : selectedItem?.label}
    </Box>
  )
}

/**
 * It renders a Dropdown to select the statement filter.
 */
const Filter = StatementDropdown

/**
 * It renders a Dropdown to select the statement condition according to the statement filter conditions.
 */
const Conditions = StatementDropdown
/**
 * It renders a component according to the statement filter resolver.
 */
const Value = ResolvedValue
/**
 * It renders a menu where it's possible to delete or duplicate the current statement.
 */
const Menu = StatementMenu

interface StatementConjunctionProps
  extends StatementDropdownProps<Conjunction> {
  /** Current statement index */
  index: number
  /** First statement conjunction label */
  whereLabel: string
}

export const Statement = Object.assign(_Statement, {
  Conjunction: StatementConjunction,
  Menu,
  Filter,
  Conditions,
  Value,
})
