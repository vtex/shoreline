import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Text } from '../index'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui/Text',
  component: Text,
} as Meta

export const Playground: Story = (args) => {
  return <Text {...args} />
}

Playground.args = {
  children: 'Text!',
}

export function Variants() {
  return (
    <>
      <Text variant="pageTitle">Span</Text>
      <br />
      <Text variant="title1">Span</Text>
      <br />
      <Text variant="title2">Span</Text>
      <br />
      <Text variant="action1">Span</Text>
      <br />
      <Text variant="action2">Span</Text>
      <br />
      <Text variant="body">Span</Text>
      <br />
      <Text variant="detail">Span</Text>
    </>
  )
}

export function Tone() {
  return (
    <>
      <Text tone="primary">Span</Text>
      <br />
      <Text tone="secondary">Span</Text>
      <br />
      <Text tone="warning">Span</Text>
      <br />
      <Text tone="critical">Span</Text>
      <br />
      <Text tone="positive">Span</Text>
      <br />
      <Text tone="info">Span</Text>
    </>
  )
}

export function Csx() {
  return <Text className={csx({ fontSize: 50 })}>Primary text</Text>
}
