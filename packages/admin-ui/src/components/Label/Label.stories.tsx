import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Flex } from '@vtex/admin-primitives'

import type { LabelProps } from './index'
import { Label } from './index'

export default {
  title: 'admin-ui/Label',
  component: Label,
} as Meta

export const Playground: Story<LabelProps> = (args) => {
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
    <Flex direction="column" csx={{ width: 160 }}>
      <Label htmlFor="text-id">Text Input Label!</Label>
      <input type="text" id="text-id" />
    </Flex>
  )
}
