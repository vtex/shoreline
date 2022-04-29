import React from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import {
  SelectionTree,
  useSelectionTreeState,
  SelectionTreeRoot,
  SelectionTreeItem,
} from '../index'
import { Checkbox } from '../../../checkbox'
import { Label } from '../../Label'

export default {
  title: 'admin-ui/SelectionTree',
  component: SelectionTree,
} as Meta

const items = [
  { id: 1, name: 'Name 1' },
  { id: 2, name: 'Name 2' },
  { id: 3, name: 'Name 3' },
  { id: 4, name: 'Name 4' },
  { id: 5, name: 'Name 5' },
]

export const Basic = () => {
  const state = useSelectionTreeState({
    items,
  })

  return (
    <SelectionTree state={state}>
      <SelectionTreeRoot />

      {items.map((item) => (
        <Label
          csx={{
            display: 'flex',
            alignItems: 'center',
            width: 250,
            height: 48,
            borderBottom: '$neutral',
            cursor: 'pointer',
            ':hover': {
              bg: 'muted',
            },
          }}
          key={item.id}
        >
          <SelectionTreeItem label={item.name} value={item.id} />
        </Label>
      ))}
    </SelectionTree>
  )
}

export const InitiallySelected = () => {
  const state = useSelectionTreeState({
    items,
    isInitiallySelected: (item) => item.id === 1 || item.id === 2,
  })

  return (
    <SelectionTree state={state}>
      <SelectionTreeRoot />

      {items.map((item) => (
        <Label
          csx={{
            display: 'flex',
            alignItems: 'center',
            width: 250,
            height: 48,
            borderBottom: '$neutral',
            cursor: 'pointer',
            ':hover': {
              bg: 'muted',
            },
          }}
          key={item.id}
        >
          <SelectionTreeItem label={item.name} value={item.id} />
        </Label>
      ))}
    </SelectionTree>
  )
}

export const BareStateHook = () => {
  const state = useSelectionTreeState({
    items,
  })

  return (
    <tag.div>
      <Checkbox state={state.root} />
      {items.map((item) => (
        <Label
          csx={{
            display: 'flex',
            alignItems: 'center',
            width: 250,
            height: 48,
            borderBottom: '$neutral',
            cursor: 'pointer',
            ':hover': {
              bg: 'muted',
            },
          }}
          key={item.id}
        >
          <Checkbox label={item.name} value={item.id} state={state.items} />
        </Label>
      ))}
    </tag.div>
  )
}
