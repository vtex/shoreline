import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Button, ButtonProps } from './index'
import { IconMock } from './IconMock'

export default {
  title: 'beta/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => (
  <Button {...args} icon={(props) => <IconMock {...props} />} />
)

export const Playground = Template.bind({})
Playground.args = {
  children: 'Brand UI Button',
}

export const ButtonVariaties = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
  </>
)

export const ButtonSizes = () => (
  <>
    <Button size="regular" sx={{ marginRight: 4 }}>
      Regular
    </Button>
    <Button size="small">Small</Button>
    <Button size="block" sx={{ marginTop: 4 }}>
      Block
    </Button>
  </>
)

export const ButtonWithIconAndLabel = () => (
  <Button icon={(props) => <IconMock {...props} />}>Button</Button>
)

export const ButtonWithIcon = () => {
  return <Button icon={(props) => <IconMock {...props} />} />
}
