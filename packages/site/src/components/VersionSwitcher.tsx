import React from 'react'
import { Dropdown, useDropdownState, Set, Text } from '@vtex/admin-ui'

const items = [
  {
    id: 1,
    label: '0.114.x',
    to: 'http://0.114.x--admin-ui.surge.sh',
  },
  {
    id: 2,
    label: '0.115.x',
    to: 'https://admin-ui.vercel.app',
  },
]

export function VersionSwitcher() {
  const state = useDropdownState({
    items,
    itemToString: (i) => i?.label ?? '',
    onSelectedItemChange({ selectedItem }) {
      if (!window) return
      if (!selectedItem) return

      window.location.replace(selectedItem.to)
    },
    initialSelectedItem: items[1],
  })

  return (
    <Set csx={{ marginLeft: 5 }}>
      <Text tone="primary">Docs Version: </Text>
      <Dropdown
        label="Version Switcher"
        state={state}
        items={items}
        renderItem={(i) => i?.label ?? ''}
        variant="adaptative-dark"
      />
    </Set>
  )
}
