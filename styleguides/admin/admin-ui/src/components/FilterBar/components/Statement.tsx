import React from 'react'
import { Flex, Box, FlexProps } from '@vtex/admin-primitives'

import { Conjunction } from '../typings'

import { StatementDropdown, StatementDropdownProps } from './StatementDropdown'
import { ResolvedValue } from '../resolvers/core'
import { StatementMenu } from './StatementMenu'

export function Statement(props: StatementProps) {
  const { children, ...htmlProps } = props

  return (
    <Flex justify="space-between" csx={{ width: '100%' }} {...htmlProps}>
      {children}
    </Flex>
  )
}

Statement.Conjunction = function StatementConjunction(
  props: StatementDropdownProps<Conjunction> & { index: number }
) {
  const { index, selectedItem, handleItemChange, items, label } = props

  return index === 1 ? (
    <StatementDropdown
      label={label}
      selectedItem={selectedItem}
      handleItemChange={handleItemChange}
      items={items}
      csx={{ minWidth: 100 }}
    />
  ) : (
    <Box csx={{ paddingLeft: 3 }}>{index === 0 ? 'Where' : selectedItem}</Box>
  )
}
Statement.Filter = StatementDropdown
Statement.Conditions = StatementDropdown
Statement.Value = ResolvedValue
Statement.Menu = StatementMenu

export type StatementProps = FlexProps
