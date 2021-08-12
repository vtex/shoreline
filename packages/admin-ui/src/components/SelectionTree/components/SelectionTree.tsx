import type { ReactNode } from 'react'
import React from 'react'
import type { SelectionTreeState } from '../state'
import { SelectionTreeContext } from '../context'

export function SelectionTree(props: Props) {
  const { state, children } = props

  return (
    <SelectionTreeContext.Provider value={state}>
      {children}
    </SelectionTreeContext.Provider>
  )
}

interface Props {
  state: SelectionTreeState
  children?: ReactNode
}
