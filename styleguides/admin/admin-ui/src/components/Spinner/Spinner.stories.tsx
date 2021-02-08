import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Spinner, SpinnerProps } from './index'

export default {
  title: 'components/Spinner',
  component: Spinner,
} as Meta

export const Playground: Story<SpinnerProps> = (args) => {
  return <Spinner {...args} />
}

Playground.args = {
  size: 24,
  color: 'blue'
}

export const Size = () => (
  <Spinner size={100} />
)

export const Color = () => (
  <Spinner color="red.default" />
)
