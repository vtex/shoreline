/* eslint-disable no-console */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { TagProps } from './tag'
import { Tag } from './tag'
import { Stack } from '../stack'
import { Inline } from '../inline'

export default {
  title: 'admin-ui-review/tag',
  component: Tag,
  argTypes: {
    palette: {
      options: ['cyan', 'purple', 'green', 'red', 'orange', 'teal', 'gray'],
      control: { type: 'select' },
    },
  },
} as Meta

export const Playground: Story<TagProps> = (args) => {
  return <Tag {...args} />
}

Playground.args = {
  label: 'Rio de Janeiro',
}

export function Variants() {
  return (
    <Stack>
      <Inline>
        <Tag label="Rio de Janeiro" />
        <Tag label="Rio de Janeiro" palette="cyan" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="green" />
      </Inline>
      <Inline>
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="orange" />
        <Tag label="Rio de Janeiro" palette="teal" />
        <Tag label="Rio de Janeiro" palette="gray" />
      </Inline>
    </Stack>
  )
}
