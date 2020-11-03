import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableInput as Input } from './index'

export default {
  title: 'system-next/input',
} as Meta

export const Base: Story = () => {
  return <Input aria-label="Label" />
}

export const OverrideStyles: Story = () => {
  return <Input aria-label="Label" styleOverrides={{ borderColor: 'text' }} />
}
