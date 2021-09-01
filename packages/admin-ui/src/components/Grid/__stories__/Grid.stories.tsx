import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import { Grid, GridItem } from '../index'

export default {
  title: 'primitives/Grid',
  component: Grid,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Grid {...args}>
      <GridItem area="green" csx={{ bg: 'green' }} />
      <GridItem area="blue" csx={{ bg: 'blue' }} />
      <GridItem area="red" csx={{ bg: 'red' }} />
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
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
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
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
      <tag.div csx={{ bg: 'blue' }} />
    </Grid>
  )
}
