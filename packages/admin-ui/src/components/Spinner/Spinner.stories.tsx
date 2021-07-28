import React from 'react'
import type { Story, Meta } from '@storybook/react'

import type { SpinnerProps } from './index'
import { Spinner } from './index'

export default {
  title: 'admin-ui/Spinner',
  component: Spinner,
} as Meta

export const Playground: Story<SpinnerProps> = (args) => {
  return <Spinner {...args} />
}

Playground.args = {
  size: 24,
  color: 'blue',
}

export const Size = () => <Spinner size={100} />

export const Color = () => <Spinner color="red.default" />
