import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Grid } from './index'
import { Box } from '../Box'

export default {
  title: 'admin-ui/Grid',
  component: Grid,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Grid {...args}>
      <Grid.Item area="green" styles={{ bg: 'green' }} />
      <Grid.Item area="blue" styles={{ bg: 'blue' }} />
      <Grid.Item area="red" styles={{ bg: 'red' }} />
    </Grid>
  )
}

Playground.args = {
  templateColumns: '1fr 4fr',
  templateAreas: ['green blue blue', 'green red red'],
  templateRows: '1fr 2fr',
  gap: 4,
  styles: { height: 400, width: 600 },
}

export const TemplateColumns = () => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      columnGap="4"
      styles={{ height: 100 }}
    >
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
    </Grid>
  )
}

export const TemplateRows = () => {
  return (
    <Grid
      templateRows="repeat(5, 1fr)"
      rowGap="4"
      styles={{ height: 500, width: 500 }}
    >
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
      <Box styles={{ bg: 'blue' }} />
    </Grid>
  )
}
