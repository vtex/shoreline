import React from 'react'
import { useSelectionTreeContext } from '../context'
import { Checkbox } from '../../Checkbox'

export function SelectionTreeRoot(props: any) {
  const state = useSelectionTreeContext()

  return <Checkbox state={state.root} {...props} />
}
