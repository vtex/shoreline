import React from 'react'

import { Grid, GridCell } from '../index'
import './story.css'

export default {
  title: 'shoreline-components/grid',
}

export function Default() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
      <GridCell className="cell" />
      <GridCell className="cell" />
      <GridCell className="cell" />
    </Grid>
  )
}
