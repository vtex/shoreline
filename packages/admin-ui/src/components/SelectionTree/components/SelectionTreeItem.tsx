import React from 'react'
import { useSelectionTreeContext } from '../context'
import { Checkbox } from '../../Checkbox'

export function SelectionTreeItem(props: Props) {
  const { value, ...rest } = props
  const state = useSelectionTreeContext()

  return <Checkbox value={value} state={state.items} {...rest} />
}

interface Props {
  value: any
  disabled?: any
  onClick?: any
}
