import React from 'react'

import { render, axe } from '../../../test-utils'
import { Grid, GridItem } from '../index'

describe('Grid', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Grid
        templateAreas={['row-1', 'row-2']}
        templateColumns="1fr"
        templateRows="1fr 2fr"
        gap="4"
      >
        <GridItem area="row-1" />
        <GridItem area="row-2" />
      </Grid>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
