import React from 'react'
import { useSelectionTreeContext } from '../context'
import type { CheckboxProps } from '../../Checkbox'
import { Checkbox } from '../../Checkbox'

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
export function SelectionTreeItem(props: Props) {
  const state = useSelectionTreeContext()

  return <Checkbox state={state.items} {...props} />
}

type Props = Omit<CheckboxProps, 'state'>
