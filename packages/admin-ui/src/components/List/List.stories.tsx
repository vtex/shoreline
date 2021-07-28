import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { List } from './index'
import { ListItem } from './ListItem'

export default {
  title: 'admin-ui/List',
  component: List,
} as Meta

export const Playground: Story = (args) => {
  return (
    <List {...args}>
      <List.Item>Coffee</List.Item>
      <List>
        <List.Item>Arabica</List.Item>
        <List.Item>Robusta</List.Item>
      </List>
      <List.Item>Juice</List.Item>
      <List.Item>Tea</List.Item>
    </List>
  )
}

export function Patterns() {
  return (
    <List>
      <List.Item csx={{ text: 'subtitle' }}>Coffee</List.Item>
      <List>
        <List.Item csx={{ text: 'highlight' }}>Arabica</List.Item>
        <List.Item csx={{ text: 'highlight' }}>Robusta</List.Item>
      </List>
      <List.Item csx={{ text: 'highlight' }}>Juice</List.Item>
      <List.Item csx={{ text: 'highlight' }}>Tea</List.Item>
    </List>
  )
}

export function Csx() {
  return (
    <List style="circle" csx={{ bg: 'blue.secondary' }}>
      <List.Item csx={{ bg: 'blue', color: 'light.primary' }}>
        Coffee Primary
      </List.Item>
      <List.Item>Juice</List.Item>
      <List.Item>Tea</List.Item>
    </List>
  )
}

export function Ordered() {
  return (
    <List ordered>
      <List.Item>Coffee</List.Item>
      <List.Item>Juice</List.Item>
      <List.Item>Tea</List.Item>
      <List ordered>
        <ListItem>With Milk</ListItem>
        <ListItem>Without Milk</ListItem>
      </List>
    </List>
  )
}
