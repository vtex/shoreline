import React from 'react'
import '@vtex/shoreline-visual'

import { Grid, GridCell } from '../index'
import './style.css'

export default {
  title: 'shoreline-components/grid',
}

export function Default() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
      <GridCell />
      <GridCell />
      <GridCell />
    </Grid>
  )
}
