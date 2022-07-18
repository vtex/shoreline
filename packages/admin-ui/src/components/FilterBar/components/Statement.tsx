import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Box } from '../../../box'
import type { Conjunction } from '../typings'
import type { StatementDropdownProps } from './StatementDropdown'
import { StatementDropdown } from './StatementDropdown'
import { ResolvedValue } from '../resolvers/core'
import type { MenuState } from '../../../menu'
import { useMenuState } from '../../../menu'

/**
 * Statement container
 */
const _Statement = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
    ...props,
  })
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

const Menu = (props: StatementMenuProps) => {
  const { children } = props
  const menuState = useMenuState()

  return <>{children(menuState)}</>
}

interface StatementConjunctionProps
  extends StatementDropdownProps<Conjunction> {
  /** Current statement index */
  index: number
  /** First statement conjunction label */
  whereLabel: string
}

interface StatementMenuProps {
  children: (state: MenuState) => JSX.Element
}

export const Statement = Object.assign(_Statement, {
  Conjunction: StatementConjunction,
  Filter,
  Conditions,
  Value,
  Menu,
})
