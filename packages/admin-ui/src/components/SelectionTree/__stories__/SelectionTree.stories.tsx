import React from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import {
  SelectionTree,
  useSelectionTreeState,
  SelectionTreeRoot,
  SelectionTreeItem,
} from '../index'
import { Checkbox } from '../../Checkbox'
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
            border: 'divider-bottom',
            cursor: 'pointer',
            ':hover': {
              bg: 'light.secondary',
            },
          }}
          key={item.id}
        >
          <SelectionTreeItem value={item.id} />
          <tag.p csx={{ paddingLeft: 2 }}>{item.name}</tag.p>
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
            border: 'divider-bottom',
            cursor: 'pointer',
            ':hover': {
              bg: 'light.secondary',
            },
          }}
          key={item.id}
        >
          <SelectionTreeItem value={item.id} />
          <tag.p csx={{ paddingLeft: 2 }}>{item.name}</tag.p>
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
            border: 'divider-bottom',
            cursor: 'pointer',
            ':hover': {
              bg: 'light.secondary',
            },
          }}
          key={item.id}
        >
          <Checkbox value={item.id} state={state.items} />
          <tag.p csx={{ paddingLeft: 2 }}>{item.name}</tag.p>
        </Label>
      ))}
    </tag.div>
  )
}
