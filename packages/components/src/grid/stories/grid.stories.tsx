import '../../../dist/styles.min.css'
import React from 'react'

import { Grid, GridCell } from '../index'
import { cellStyle } from './grid.stories.css'

export default {
  title: 'shoreline-components/grid',
}

export function Default() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
      <GridCell className={cellStyle} />
      <GridCell className={cellStyle} />
      <GridCell className={cellStyle} />
    </Grid>
  )
}
