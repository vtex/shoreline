import React from 'react'
import type { Meta } from '@storybook/react'
import { Grid, GridItem } from '../index'
import { Box } from '../../box'

export default {
  title: 'admin-ui-review/grid',
  component: Grid,
} as Meta

export const TemplateColumns = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" columnGap="4" csx={{ height: 100 }}>
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
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
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
    </Grid>
  )
}

export const Gap = () => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap="4"
      csx={{ height: 500, width: 500 }}
    >
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
    </Grid>
  )
}

export const TemplateArea = () => {
  return (
    <Grid
      templateAreas={['header header', 'nav main', 'nav footer']}
      gap="4"
      templateColumns="1fr 4fr"
      templateRows="1fr 4fr 1fr"
      csx={{ height: 500, width: 500 }}
    >
      <GridItem area="header" csx={{ bg: '$info' }} />
      <GridItem area="nav" csx={{ bg: '$positive' }} />
      <GridItem area="main" csx={{ bg: '$critical' }} />
      <GridItem area="footer" csx={{ bg: '$warning' }} />
    </Grid>
  )
}

export const Responsive = () => {
  return (
    <Grid
      templateColumns={{ mobile: '1fr', tablet: 'repeat(3, 1fr)' }}
      gap={{ mobile: '2', tablet: '4', desktop: '6' }}
      csx={{ height: 500, width: 500 }}
    >
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
      <Box csx={{ bg: '$info' }} />
    </Grid>
  )
}
