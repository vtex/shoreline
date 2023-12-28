import React from 'react'
import { style } from '@vtex/shoreline-utils'
import { Grid, GridCell } from '../index'

export default {
  title: 'layouts/grid',
}

const cellStyle = style({
  backgroundColor: '$color-blue-3',
  borderRadius: '$border-radius-medium',
  width: '100%',
  height: '3.5rem',
})

export function Default() {
  return (
    <Grid columns="repeat(3, 1fr)">
      <GridCell style={cellStyle} />
      <GridCell style={cellStyle} />
      <GridCell style={cellStyle} />
      <GridCell style={cellStyle} />
      <GridCell style={cellStyle} />
      <GridCell style={cellStyle} />
    </Grid>
  )
}
