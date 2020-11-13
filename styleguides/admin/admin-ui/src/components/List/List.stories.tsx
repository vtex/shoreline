import React from 'react'
import { Meta } from '@storybook/react'

import { List } from './index'
import { ListItem } from './ListItem'

export default {
  title: 'beta/typography/list',
} as Meta

export function Example() {
  return (
    <List>
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
      <List.Item text="subtitle">Coffee</List.Item>
      <List>
        <List.Item text="highlight">Arabica</List.Item>
        <List.Item text="highlight">Robusta</List.Item>
      </List>
      <List.Item text="highlight">Juice</List.Item>
      <List.Item text="highlight">Tea</List.Item>
    </List>
  )
}

export function StyleOverrides() {
  return (
    <List style="circle" styleOverrides={{ bg: 'secondary' }}>
      <List.Item styleOverrides={{ bg: 'primary.base', color: 'background' }}>
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
