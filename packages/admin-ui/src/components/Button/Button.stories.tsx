import React, { useState } from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconSquaresFour, IconPlus } from '@vtex/phosphor-icons'

import type { ButtonProps } from './index'
import { Button } from './index'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Button',
  component: Button,
} as Meta

export const Playground: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}

Playground.args = {
  children: 'Admin UI Button',
  csx: {},
}

export const Size: Story = () => {
  return (
    <Set>
      <Button disabled>Regular Button Disabled</Button>
      <Button size="small">Small Button</Button>
    </Set>
  )
}

export const Variant: Story = () => {
  return (
    <Set orientation="vertical">
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="tertiary">Tertiary Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="danger-secondary">Danger Secondary Button</Button>
      <Button variant="danger-tertiary">Danger Tertiary Button</Button>
      <Button variant="adaptative-dark">Adaptative Dark Button</Button>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <Button icon={<IconSquaresFour />}>Icon Start</Button>
      <Button icon={<IconSquaresFour />} iconPosition="end" variant="secondary">
        IconEnd
      </Button>
      <Button icon={<IconSquaresFour title="Icon only" />} variant="tertiary" />
    </Set>
  )
}

export const Loading = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Set>
      <Button
        icon={<IconPlus />}
        loading={loading}
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        icon={<IconPlus />}
        loading={loading}
        variant="danger"
        iconPosition="end"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        loading={loading}
        variant="secondary"
        onClick={() => setLoading(!loading)}
        size="small"
      >
        Loading
      </Button>
      <Button
        icon={<IconPlus />}
        loading={loading}
        variant="danger-secondary"
        onClick={() => setLoading(!loading)}
      />
      <Button
        loading={loading}
        variant="tertiary"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        loading={loading}
        variant="danger-tertiary"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
    </Set>
  )
}
