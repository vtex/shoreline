import React from 'react'
import { Meta, Story } from '@storybook/react'

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
      <List.Item styleOverrides={{ text: 'subtitle' }}>Coffee</List.Item>
      <List>
        <List.Item styleOverrides={{ text: 'highlight' }}>Arabica</List.Item>
        <List.Item styleOverrides={{ text: 'highlight' }}>Robusta</List.Item>
      </List>
      <List.Item styleOverrides={{ text: 'highlight' }}>Juice</List.Item>
      <List.Item styleOverrides={{ text: 'highlight' }}>Tea</List.Item>
    </List>
  )
}

export function StyleOverrides() {
  return (
    <List style="circle" styleOverrides={{ bg: 'blue.secondary' }}>
      <List.Item styleOverrides={{ bg: 'blue', color: 'light.primary' }}>
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
