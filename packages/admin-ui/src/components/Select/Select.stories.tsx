import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { Select } from './index'

export default {
  title: 'admin-ui/Select',
  component: Select,
} as Meta

const days = [
  'Yesterday',
  '7 days ago',
  '28 days ago',
  'One year ago',
  'Two years ago',
]

const brewMethods = {
  hot: ['Chemex', 'Eva Solo', 'Stove Top', 'Doubleshot', 'Aeropress'],
  cold: ['Iced Coffee', 'Cold Brew', 'French Press'],
}

export const Basic = () => {
  const [value, setValue] = useState('Yesterday')

  return (
    <Select
      id="id"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Date"
      helperText="Help text"
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </Select>
  )
}

export const Groups = () => {
  const [value, setValue] = useState('Chemex')

  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Brew Method"
      helperText="Select the coffee brew type"
    >
      <optgroup label="Hot Temperature">
        {brewMethods.hot.map((bm) => (
          <option key={bm} value={bm}>
            {bm}
          </option>
        ))}
      </optgroup>
      <optgroup label="Cold Temperature">
        {brewMethods.cold.map((bm) => (
          <option key={bm} value={bm}>
            {bm}
          </option>
        ))}
      </optgroup>
    </Select>
  )
}

export const Critical = () => {
  const [value, setValue] = useState('Yesterday')

  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Date"
      helperText="Help text"
      criticalText="Error!"
      tone="critical"
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </Select>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('Yesterday')

  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Date"
      helperText="Help text"
      disabled
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </Select>
  )
}
