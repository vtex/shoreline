import React from 'react'

import { render } from '../../test-utils'
import { Grid, GridItem } from '../index'

describe('Grid', () => {
  it('renders', async () => {
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

    expect(container).toBeInTheDocument()
  })
})
