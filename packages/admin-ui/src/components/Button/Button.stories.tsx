import React, { useState } from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconAppStore, IconAdd } from '@vtex/admin-ui-icons'

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
      <Button>Regular Button</Button>
      <Button size="small">Small Button</Button>
    </Set>
  )
}

export const Variant: Story = () => {
  return (
    <Set orientation="vertical">
      <Button>Solid Button</Button>
      <Button variant="soft">Soft Button</Button>
      <Button variant="text">Text Button</Button>
      <Button tone="critical">Critical Solid Button</Button>
      <Button tone="critical" variant="soft">
        Critical Soft Button
      </Button>
      <Button tone="critical" variant="text">
        Critical Text Button
      </Button>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <Button icon={<IconAppStore />}>Icon Start</Button>
      <Button icon={<IconAppStore />} iconPosition="end" variant="soft">
        IconEnd
      </Button>
      <Button icon={<IconAppStore title="Icon only" />} variant="text" />
    </Set>
  )
}

export const Loading = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Set>
      <Button
        icon={<IconAdd />}
        loading={loading}
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        icon={<IconAdd />}
        loading={loading}
        tone="critical"
        iconPosition="end"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        loading={loading}
        variant="soft"
        onClick={() => setLoading(!loading)}
        size="small"
      >
        Loading
      </Button>
      <Button
        icon={<IconAdd />}
        loading={loading}
        tone="critical"
        variant="soft"
        onClick={() => setLoading(!loading)}
      />
      <Button
        loading={loading}
        variant="text"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        loading={loading}
        tone="critical"
        variant="text"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
    </Set>
  )
}
