import React from 'react'
import { Meta } from '@storybook/react'

import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { List } from './index'
import { ListItem } from './ListItem'

export default {
  title: 'beta/typography/list',
} as Meta

export function Example() {
  return (
    <ThemeProvider>
      <List>
        <List.Item>Coffee</List.Item>
        <List>
          <List.Item>Arabica</List.Item>
          <List.Item>Robusta</List.Item>
        </List>
        <List.Item>Juice</List.Item>
        <List.Item>Tea</List.Item>
      </List>
    </ThemeProvider>
  )
}

export function Patterns() {
  return (
    <ThemeProvider>
      <List>
        <List.Item text="subtitle">Coffee</List.Item>
        <List>
          <List.Item text="highlight">Arabica</List.Item>
          <List.Item text="highlight">Robusta</List.Item>
        </List>
        <List.Item text="highlight">Juice</List.Item>
        <List.Item text="highlight">Tea</List.Item>
      </List>
    </ThemeProvider>
  )
}

export function StyleOverrides() {
  return (
    <ThemeProvider>
      <List style="circle" styleOverrides={{ bg: 'primary.washed.0' }}>
        <List.Item styleOverrides={{ bg: 'primary.base', color: 'background' }}>
          Coffee Primary
        </List.Item>
        <List.Item>Juice</List.Item>
        <List.Item>Tea</List.Item>
      </List>
    </ThemeProvider>
  )
}

export function Ordered() {
  return (
    <ThemeProvider>
      <List ordered>
        <List.Item>Coffee</List.Item>
        <List.Item>Juice</List.Item>
        <List.Item>Tea</List.Item>
        <List ordered>
          <ListItem>With Milk</ListItem>
          <ListItem>Without Milk</ListItem>
        </List>
      </List>
    </ThemeProvider>
  )
}
