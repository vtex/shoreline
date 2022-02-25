import React, { useState } from 'react'

import type { Meta } from '@storybook/react'

import { DateField, useDateFieldState } from './index'

export default {
  title: 'admin-ui/DateField',
} as Meta

export const Uncontrolled = () => {
  const state = useDateFieldState()

  return (
    <div>
      <DateField label="Date" state={state} />
    </div>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState(new Date(2020, 0, 8))
  const state = useDateFieldState({
    value,
    onChange: setValue,
  })

  return <DateField label="Date" state={state} />
}
