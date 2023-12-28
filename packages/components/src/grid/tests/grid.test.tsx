import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Grid, GridCell } from '../index'

describe('grid', () => {
  test('renders', () => {
    const { container } = render(
      <Grid>
        <GridCell>Item 1</GridCell>
      </Grid>
    )

    expect(container.querySelector('[data-sl-grid]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-grid-cell]')).toBeInTheDocument()
  })
})
