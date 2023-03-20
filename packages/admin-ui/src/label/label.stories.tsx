import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { LabelProps } from './label'
import { Label } from './label'
import { Flex } from '../flex'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui/Label',
  component: Label,
} as Meta

export const Playground: Story<LabelProps> = (args) => {
  return (
    <Label
      className={csx({
        display: 'flex',
      })}
      {...args}
    >
      <input type="checkbox" />
      Checkbox Input Label!
    </Label>
  )
}

Playground.args = {}

export const HtmlFor = () => {
  return (
    <Flex direction="column" csx={{ width: 160 }}>
      <Label htmlFor="text-id">Text Input Label!</Label>
      <input type="text" id="text-id" />
    </Flex>
  )
}