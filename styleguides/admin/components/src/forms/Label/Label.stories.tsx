import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label } from './index'
import { onda } from '@vtex/admin-core'

export default {
  title: 'forms/Label',
  component: Label,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Label {...args}>
      <input type="checkbox" />
      Checkbox Input Label!
    </Label>
  )
}

Playground.args = { csx: { display: 'flex' } }

export const HtmlFor = () => {
  return (
    <onda.div csx={{ display: 'flex', flexDirection: 'column', width: 160 }}>
      <Label htmlFor="text-id">Text Input Label!</Label>
      <input type="text" id="text-id" />
    </onda.div>
  )
}
