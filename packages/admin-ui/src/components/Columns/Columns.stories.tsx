import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Box } from '../Box'
import { Columns } from './index'

export default {
  title: 'admin-ui/Columns',
  component: Columns,
} as Meta

const primaryStyles = {
  padding: 2,
  bg: 'blue',
  color: 'light.primary',
}

const invertedStyles = {
  padding: 2,
  bg: 'dark.primary',
  color: 'light.primary',
}

export const Playground: Story = (args) => {
  return (
    <Columns {...args}>
      <Columns.Item>
        <Box csx={primaryStyles}>6 Units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box csx={invertedStyles}>6 Units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const Auto = () => {
  return (
    <Columns spacing={1}>
      <Columns.Item>
        <Box csx={primaryStyles}>4 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box csx={invertedStyles}>4 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box csx={primaryStyles}>4 units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const AutoGapless = () => {
  return (
    <Columns spacing={0}>
      <Columns.Item>
        <Box csx={primaryStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box csx={invertedStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box csx={primaryStyles}>6 units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const Units = () => {
  return (
    <Columns spacing={1}>
      <Columns.Item units={3}>
        <Box csx={primaryStyles}>3 units</Box>
      </Columns.Item>
      <Columns.Item units={6}>
        <Box csx={invertedStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item units={3}>
        <Box csx={primaryStyles}>3 units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const ResponsiveUnits = () => {
  return (
    <Columns spacing={1}>
      <Columns.Item units={6} offset={['right', 'right', 'none']}>
        <Box csx={primaryStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item units={3}>
        <Box csx={invertedStyles}>3 units</Box>
      </Columns.Item>
    </Columns>
  )
}
