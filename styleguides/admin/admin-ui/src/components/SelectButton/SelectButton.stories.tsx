import React from 'react'
import { Meta } from '@storybook/react'

import { Set } from '../Set'
import { SelectButton, useSelectState, SelectState } from './index'

export default {
  title: 'forms/select-button',
  component: SelectButton,
} as Meta

export const Basic = () => {
  const state = useSelectState({
    items: ['Yesterday', '7 days ago', '28 days ago', 'One year ago'],
    initialSelectedItem: '7 days ago',
  })

  return (
    <SelectButton
      items={['Yesterday', '7 days ago', '28 days ago', 'One year ago']}
      state={state}
      label="Date"
    />
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
  const brewMethods = ['French Press', 'Chemex', 'Cold Brew', 'Aeropress']
  const recipes = ['Latte', 'Espresso', 'Irish Coffee']

  return (
    <Set>
      <SelectState items={species} initialSelectedItem="Arabica">
        {(state) => (
          <SelectButton items={species} state={state} label="Species" />
        )}
      </SelectState>
      <SelectState items={brewMethods} initialSelectedItem="Chemex">
        {(state) => (
          <SelectButton
            variant="subtle"
            items={brewMethods}
            state={state}
            label="Methods"
          />
        )}
      </SelectState>
      <SelectState items={recipes} initialSelectedItem="Espresso">
        {(state) => (
          <SelectButton
            variant="filled"
            items={recipes}
            state={state}
            label="Recipes"
          />
        )}
      </SelectState>
    </Set>
  )
}

export const StateHandler = () => {
  const items = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']

  return (
    <SelectState items={items} initialSelectedItem="7 days ago">
      {(state) => <SelectButton items={items} state={state} label="Date" />}
    </SelectState>
  )
}

export const Disabled = () => {
  const items = ['Yesterday', '7 days ago', '28 days ago', 'One year ago']

  return (
    <SelectState items={items} initialSelectedItem="7 days ago">
      {(state) => (
        <SelectButton items={items} state={state} label="Date" disabled />
      )}
    </SelectState>
  )
}
