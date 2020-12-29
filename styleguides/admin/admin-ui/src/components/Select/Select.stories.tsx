import React, { useEffect, useState } from 'react'
import { Meta } from '@storybook/react'

import { Select, useSelectState } from './index'
import { Set } from '../Set'
import { Card } from '../Card'

export default {
  title: 'forms/Select',
  component: Select,
} as Meta

const days = [
  'Yesterday',
  '7 days ago',
  '28 days ago',
  'One year ago',
  'Two years ago',
]

const brewMethods = [
  'French Press',
  'Chemex',
  'Cold Brew',
  'Aeropress',
  'Doubleshot',
  'Iced Coffee',
  'Eva Solo',
  'Stove Top',
]

export const Basic = () => {
  const state = useSelectState({ items: days })
  const initialState = useSelectState({
    items: brewMethods,
    initialSelectedItem: 'Aeropress',
  })

  return (
    <Set styleOverrides={{ marginTop: '8rem' }}>
      <Select items={days} state={state} label="Date" helperText="Help text" />
      <Select
        items={brewMethods}
        state={initialState}
        label="Brew Method"
        helperText="Brew method help text"
      />
    </Set>
  )
}

export const Error = () => {
  const state = useSelectState({ items: days })
  const [error, setError] = useState(true)

  useEffect(() => {
    if (state.selectedItem === 'Yesterday') setError(false)
    else setError(true)
  }, [state.selectedItem])

  return (
    <Select
      items={days}
      state={state}
      label="Date"
      error={error}
      errorMessage="Message error"
    />
  )
}

export const Disabled = () => {
  const state = useSelectState({ items: [] })

  const initialState = useSelectState({
    items: days,
    initialSelectedItem: '7 days ago',
  })

  return (
    <Set>
      <Select
        items={[]}
        state={state}
        label="Brew Method"
        disabled
        helperText="Brew method help text"
      />
      <Select
        items={days}
        state={initialState}
        label="Date"
        disabled
        helperText="Help text"
      />
    </Set>
  )
}

export const Block = () => {
  const state = useSelectState({ items: days })

  return (
    <Card styleOverrides={{ width: 500 }}>
      <Select
        items={days}
        state={state}
        label="Date"
        errorMessage="Message error"
        block
      />
    </Card>
  )
}
