import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Columns } from './index'
import { Box } from '../Box'

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
        <Box styles={primaryStyles}>6 Units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box styles={invertedStyles}>6 Units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const Auto = () => {
  return (
    <Columns spacing={1}>
      <Columns.Item>
        <Box styles={primaryStyles}>4 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box styles={invertedStyles}>4 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box styles={primaryStyles}>4 units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const AutoGapless = () => {
  return (
    <Columns spacing={0}>
      <Columns.Item>
        <Box styles={primaryStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box styles={invertedStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item>
        <Box styles={primaryStyles}>6 units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const Units = () => {
  return (
    <Columns spacing={1}>
      <Columns.Item units={3}>
        <Box styles={primaryStyles}>3 units</Box>
      </Columns.Item>
      <Columns.Item units={6}>
        <Box styles={invertedStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item units={3}>
        <Box styles={primaryStyles}>3 units</Box>
      </Columns.Item>
    </Columns>
  )
}

export const ResponsiveUnits = () => {
  return (
    <Columns spacing={1}>
      <Columns.Item units={6} offset={['right', 'right', 'none']}>
        <Box styles={primaryStyles}>6 units</Box>
      </Columns.Item>
      <Columns.Item units={3}>
        <Box styles={invertedStyles}>3 units</Box>
      </Columns.Item>
    </Columns>
  )
}
