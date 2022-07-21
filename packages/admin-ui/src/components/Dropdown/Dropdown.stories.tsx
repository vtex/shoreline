import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Inline } from '../../inline'
import type { DropdownProps } from './index'
import { Dropdown, useDropdownState } from './index'
import { Card } from '../../card'

export default {
  title: 'admin-ui/Dropdown',
  component: Dropdown,
} as Meta

export const Playground: Story<DropdownProps<string>> = (args) => {
  const state = useDropdownState({
    items: args.items,
    initialSelectedItem: args.items[0],
  })

  return (
    <Card>
      <Dropdown {...args} state={state} />
    </Card>
  )
}

Playground.args = {
  items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
  label: 'Date',
}

export const Basic = () => {
  const state = useDropdownState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Card>
      <Dropdown
        items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
        state={state}
        label="Date"
      />
    </Card>
  )
}

export const WithObject = () => {
  const items = [
    { id: 1, label: 'Yesterday' },
    { id: 2, label: '7 days ago' },
    { id: 3, label: '28 days ago' },
    { id: 4, label: 'One year ago' },
  ]

  const state = useDropdownState({
    items,
    itemToString: (item) => item?.label ?? '',
    initialSelectedItem: items[1],
  })

  return (
    <Dropdown
      items={items}
      state={state}
      label="Date"
      renderItem={(item) => item?.label}
    />
  )
}

export const Variants = () => {
  const species = ['Arabica', 'Robusta']
  const speciesState = useDropdownState({
    items: species,
    initialSelectedItem: 'Arabica',
  })

  const brewMethods = ['French Press', 'Chemex', 'Cold Brew', 'Aeropress']
  const brewState = useDropdownState({
    items: brewMethods,
    initialSelectedItem: 'Chemex',
  })

  const recipes = ['Latte', 'Espresso', 'Irish Coffee']
  const recipesState = useDropdownState({
    items: recipes,
    initialSelectedItem: 'Chemex',
  })

  return (
    <Inline>
      <Dropdown items={species} state={speciesState} label="Species" />
      <Dropdown
        variant="secondary"
        items={brewMethods}
        state={brewState}
        label="Methods"
      />
      <Dropdown
        variant="tertiary"
        items={recipes}
        state={recipesState}
        label="Recipes"
      />
    </Inline>
  )
}

export const Disabled = () => {
  const state = useDropdownState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Dropdown
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      label="Date"
      disabled
    />
  )
}
