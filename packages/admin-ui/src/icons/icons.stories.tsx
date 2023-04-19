import React from 'react'
import type { Meta, Story } from '@storybook/react'
import type { IconProps } from './icons'
import { IconQuestion } from './icons'

export default {
  title: 'admin-ui/Icons',
  component: IconQuestion,
} as Meta

export const Playground: Story<IconProps> = (args) => {
  return (
    <div>
      <IconQuestion {...args} />
    </div>
  )
}

Playground.args = {}
