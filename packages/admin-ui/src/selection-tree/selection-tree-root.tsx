import React from 'react'

import { useSelectionTreeContext } from './selection-tree-context'
import type { CheckboxProps } from '../checkbox'
import { Checkbox } from '../checkbox'

/**
 * SelectionTree root
 * @example
 * const state = useSelectionTreeState({
 *  items: [],
 * })
 *
 * <SelectionTree state={state}>
 *  <SelectionTreeRoot />
 * </SelectionTree>
 */
export function SelectionTreeRoot(props: SelectionTreeRootProps) {
  const state = useSelectionTreeContext()

  return <Checkbox state={state.root} {...props} />
}

type SelectionTreeRootProps = Omit<CheckboxProps & any, 'state'>
