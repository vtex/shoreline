import React, { Fragment } from 'react'

import { render } from '../../../test-utils'
import { Grid, GridItem } from '../index'

describe('Grid', () => {
  it('should apply csx', () => {
    const { getByTestId } = render(
      <Grid data-testid="grid" csx={{ bg: 'azure' }}>
        <GridItem data-testid="grid-item" csx={{ bg: 'azure' }} />
      </Grid>
    )

    expect(getByTestId('grid')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('grid-item')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Grid
          templateAreas={['row-1', 'row-2']}
          templateColumns="1fr"
          templateRows="1fr 2fr"
          gap="4"
        >
          <GridItem area="row-1" />
          <GridItem area="row-2" />
        </Grid>
        <Grid
          templateAreas={['row-1', 'row-2']}
          templateColumns="1fr"
          templateRows="1fr 2fr"
          rowGap="4"
          columnGap="2"
        >
          <GridItem area="row-1" />
          <GridItem area="row-2" />
        </Grid>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
