import React from 'react'

import { useSelectionTreeContext } from './selection-tree-context'
import type { CheckboxProps } from '../checkbox'
import { Checkbox } from '../checkbox'

/**
 * SelectionTree item
 * @example
 * const items = []
 *
 * const state = useSelectionTreeState({
 *  items,
 * })
 *
 * <SelectionTree state={state}>
 *  {items.map(item => (
 *    <SelectionTreeItem value={item.id} />
 *  ))}
 * </SelectionTree>
 */
export function SelectionTreeItem(props: SelectionTreeItemProps) {
  const state = useSelectionTreeContext()

  return <Checkbox state={state.items} {...props} />
}

type SelectionTreeItemProps = Omit<CheckboxProps & any, 'state'>
