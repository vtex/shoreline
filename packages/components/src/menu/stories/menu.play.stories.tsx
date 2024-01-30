import React from 'react'
import { IconPencil, IconTrash, IconArchive } from '@vtex/shoreline-icons'
import type { MenuProps } from '../index'
import { Menu, MenuItem, MenuSeparator } from '../index'

export default {
  title: 'components/menu',
  argTypes: {
    label: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['normal', 'large'],
      description: 'Trigger size',
    },
    type: {
      control: 'select',
      options: ['menu', 'actions'],
      description: 'Menu type',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'critical',
        'criticalTertiary',
      ],
      description: 'Trigger variant',
    },
    iconOnly: { control: 'boolean' },
  },
  args: {
    size: 'normal',
    label: 'Menu',
    type: 'menu',
    variant: 'secondary',
    iconOnly: false,
  },
}

export function Play(args: MenuProps) {
  return (
    <Menu {...args}>
      <MenuItem>New Tab</MenuItem>
      <MenuItem>New Item</MenuItem>
      <MenuItem disabled>Downloads</MenuItem>
      <MenuSeparator />
      <MenuItem>
        <IconPencil /> Edit
      </MenuItem>
      <MenuItem>
        <IconArchive />
        Archive
      </MenuItem>
      <MenuSeparator />
      <MenuItem critical>
        <IconTrash />
        Delete
      </MenuItem>
    </Menu>
  )
}
