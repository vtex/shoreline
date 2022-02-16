import React, { useState } from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconPlus, IconArrowUpRight } from '@vtex/phosphor-icons'

import { Button } from './index'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Button',
  component: Button,
} as Meta

export const Playground = (args: any) => {
  return <Button {...args} />
}

Playground.args = {
  children: 'Admin UI Button',
  csx: {},
}

export const Size: Story = () => {
  return (
    <Set>
      <Button>Normal</Button>
      <Button size="large">Large</Button>
    </Set>
  )
}

export const Variant: Story = () => {
  return (
    <Set orientation="vertical">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="critical">Critical</Button>
      <Button variant="criticalSecondary">Critical secondary</Button>
      <Button variant="criticalTertiary">Critical tertiary</Button>
      <Button variant="neutralTertiary">Neutral tertiary</Button>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <Button icon={<IconPlus />}>Icon Start</Button>
      <Button
        icon={<IconArrowUpRight />}
        iconPosition="end"
        variant="secondary"
      >
        IconEnd
      </Button>
      <Button icon={<IconPlus title="Icon only" />} variant="tertiary" />
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
        variant="critical"
        iconPosition="end"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
      <Button
        loading={loading}
        variant="secondary"
        onClick={() => setLoading(!loading)}
        size="large"
      >
        Loading
      </Button>
      <Button
        icon={<IconPlus />}
        loading={loading}
        variant="criticalSecondary"
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
        variant="criticalTertiary"
        onClick={() => setLoading(!loading)}
      >
        Loading
      </Button>
    </Set>
  )
}
