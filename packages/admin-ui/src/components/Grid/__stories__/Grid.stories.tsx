import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'
import { palette } from '@vtex/admin-ui-core'

import { Grid, GridItem } from '../index'

export default {
  title: 'admin-ui/Grid',
  component: Grid,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Grid {...args}>
      <GridItem area="green" csx={palette('purple')} />
      <GridItem area="blue" csx={palette('cyan')} />
      <GridItem area="red" csx={palette('teal')} />
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
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
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
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
      <tag.div csx={palette('cyan')} />
    </Grid>
  )
}
