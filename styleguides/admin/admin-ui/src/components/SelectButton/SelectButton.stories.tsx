import React from 'react'
import { Meta } from '@storybook/react'

import { Set } from '../Set'
import { SelectButton, useSelectState } from './index'
import { Card } from '../Card'

export default {
  title: 'beta/forms/select-button',
  component: SelectButton,
} as Meta

export const Basic = () => {
  const state = useSelectState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <Card>
      <SelectButton
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

  const state = useSelectState({
    items,
    itemToString: (item) => item?.label ?? '',
    initialSelectedItem: items[1],
  })

  return (
    <SelectButton
      items={items}
      state={state}
      label="Date"
      renderItem={(item) => item?.label}
    />
  )
}

export const Variants = () => {
  const species = ['Arabica', 'Robusta']
  const speciesState = useSelectState({
    items: species,
    initialSelectedItem: 'Arabica',
  })

  const brewMethods = ['French Press', 'Chemex', 'Cold Brew', 'Aeropress']
  const brewState = useSelectState({
    items: brewMethods,
    initialSelectedItem: 'Chemex',
  })

  const recipes = ['Latte', 'Espresso', 'Irish Coffee']
  const recipesState = useSelectState({
    items: recipes,
    initialSelectedItem: 'Chemex',
  })

  return (
    <Set>
      <SelectButton items={species} state={speciesState} label="Species" />
      <SelectButton
        variant="secondary"
        items={brewMethods}
        state={brewState}
        label="Methods"
      />
      <SelectButton
        variant="tertiary"
        items={recipes}
        state={recipesState}
        label="Recipes"
      />
    </Set>
  )
}

export const Disabled = () => {
  const state = useSelectState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <SelectButton
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      label="Date"
      disabled
    />
  )
}
