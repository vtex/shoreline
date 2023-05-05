import React from 'react'
import type { Meta } from '@storybook/react'
import { Grid, GridItem } from '../index'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/grid',
  component: Grid,
} as Meta

export const TemplateColumns = () => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      columnGap="4"
      className={csx({ height: 100 })}
    >
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
    </Grid>
  )
}

export const TemplateRows = () => {
  return (
    <Grid
      templateRows="repeat(5, 1fr)"
      rowGap="4"
      className={csx({ height: 500, width: 500 })}
    >
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
    </Grid>
  )
}

export const Gap = () => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap="4"
      className={csx({ height: 500, width: 500 })}
    >
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
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
      className={csx({ height: 500, width: 500 })}
    >
      <GridItem area="header" className={csx({ bg: '$info' })} />
      <GridItem area="nav" className={csx({ bg: '$positive' })} />
      <GridItem area="main" className={csx({ bg: '$critical' })} />
      <GridItem area="footer" className={csx({ bg: '$warning' })} />
    </Grid>
  )
}

export const Responsive = () => {
  return (
    <Grid
      templateColumns={{ mobile: '1fr', tablet: 'repeat(3, 1fr)' }}
      gap={{ mobile: '2', tablet: '4', desktop: '6' }}
      className={csx({ height: 500, width: 500 })}
    >
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
      <div className={csx({ bg: '$info' })} />
    </Grid>
  )
}
