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

export const Variations = () => (
  <>
    <Button sx={{ mr: 4 }} variant="primary">
      Primary
    </Button>
    <Button sx={{ mr: 4 }} variant="secondary">
      Secondary
    </Button>
    <Button variant="tertiary">Tertiary</Button>
  </>
)

export const Sizes = () => (
  <>
    <Button size="regular" sx={{ mr: 4 }}>
      Regular
    </Button>
    <Button size="small">Small</Button>
  </>
)

export const BoxTypes = () => (
  <>
    <Button sx={{ mb: 4 }}>Default</Button>
    <Button block>Block</Button>
  </>
)

export const ButtonWithIcon = () => {
  return <Button icon={(props) => <IconMock {...props} />} />
}

export const ButtonWithIconAndLabel = () => (
  <>
    <Button icon={(props) => <IconMock {...props} />} sx={{ mr: 4 }}>
      Icon Start
    </Button>
    <Button icon={(props) => <IconMock {...props} />} iconPosition="end">
      Icon End
    </Button>
  </>
)
