import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Grid } from './index'
import { Primitive } from '../Primitive'

export default {
  title: 'primitives/Grid',
  component: Grid,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Grid {...args}>
      <Grid.Item area="green" csx={{ bg: 'green' }} />
      <Grid.Item area="blue" csx={{ bg: 'blue' }} />
      <Grid.Item area="red" csx={{ bg: 'red' }} />
    </Grid>
  )
}

Playground.args = {
  templateColumns: '1fr 4fr',
  templateAreas: ['green blue blue', 'green red red'],
  templateRows: '1fr 2fr',
  gap: 4,
  csx: { height: 400, width: 600 },
}

export const TemplateColumns = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" columnGap="4" csx={{ height: 100 }}>
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
    </Grid>
  )
}

export const TemplateRows = () => {
  return (
    <Grid
      templateRows="repeat(5, 1fr)"
      rowGap="4"
      csx={{ height: 500, width: 500 }}
    >
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
      <Primitive csx={{ bg: 'blue' }} />
    </Grid>
  )
}
