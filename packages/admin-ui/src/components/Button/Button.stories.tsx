import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { IconAppStore, IconAdd } from '@vtex/admin-ui-icons'

import { Box } from '@vtex/admin-primitives'
import { Button } from './index'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Button',
  component: Button,
} as Meta

export const Playground: Story = (args) => {
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
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="tertiary">Tertiary Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="danger-secondary">Danger Secondary Button</Button>
      <Button variant="danger-tertiary">Danger Tertiary Button</Button>
    </Set>
  )
}

export const Adaptative: Story = () => {
  return (
    <Set orientation="vertical">
      <Box csx={{ padding: 4, bg: 'dark.primary', color: 'light.primary' }}>
        <Button variant="adaptative-light">Adaptative light</Button>
      </Box>
      <Box csx={{ padding: 4 }}>
        <Button variant="adaptative-dark">Adaptative Dark</Button>
      </Box>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <Button icon={<IconAppStore />}>Icon Start</Button>
      <Button icon={<IconAppStore />} iconPosition="end" variant="secondary">
        IconEnd
      </Button>
      <Button icon={<IconAppStore title="Icon only" />} variant="tertiary" />
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
        variant="primary"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        icon={<IconAdd />}
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
        icon={<IconAdd />}
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
      <Box
        csx={{
          color: 'light.primary',
          bg: 'dark.primary',
          padding: 4,
        }}
      >
        <Button
          loading={loading}
          variant="adaptative-light"
          onClick={() => setLoading(!loading)}
        >
          Loading
        </Button>
      </Box>
      <Box
        csx={{
          color: 'dark.primary',
          bg: 'light.primary',
          padding: 4,
        }}
      >
        <Button
          loading={loading}
          variant="adaptative-dark"
          onClick={() => setLoading(!loading)}
        >
          Loading
        </Button>
      </Box>
    </Set>
  )
}
