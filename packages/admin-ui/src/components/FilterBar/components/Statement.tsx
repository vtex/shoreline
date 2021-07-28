import React from 'react'
import type { FlexProps } from '@vtex/admin-primitives'
import { Flex, Box } from '@vtex/admin-primitives'

import type { Conjunction } from '../typings'
import type { StatementDropdownProps } from './StatementDropdown'
import { StatementDropdown } from './StatementDropdown'
import { ResolvedValue } from '../resolvers/core'
import { StatementMenu } from './StatementMenu'

/**
 * Statement container
 */
export function Statement(props: StatementProps) {
  const { children, ...htmlProps } = props

  return (
    <Flex justify="space-between" csx={{ width: '100%' }} {...htmlProps}>
      {children}
    </Flex>
  )
}

/**
 * It renders either a Dropdown to select the FilterBar conjunction or the conjunction label.
 */
Statement.Conjunction = function StatementConjunction(
  props: StatementConjunctionProps
) {
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
Statement.Filter = StatementDropdown
/**
 * It renders a Dropdown to select the statement condition according to the statement filter conditions.
 */
Statement.Conditions = StatementDropdown
/**
 * It renders a component according to the statement filter resolver.
 */
Statement.Value = ResolvedValue
/**
 * It renders a menu where it's possible to delete or duplicate the current statement.
 */
Statement.Menu = StatementMenu

export type StatementProps = FlexProps

interface StatementConjunctionProps
  extends StatementDropdownProps<Conjunction> {
  /** Current statement index */
  index: number
  /** First statement conjunction label */
  whereLabel: string
}
