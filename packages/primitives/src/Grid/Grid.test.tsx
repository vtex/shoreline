import React, { Fragment } from 'react'

import { render } from '../test-utils'
import { Grid } from './index'

describe('Grid tests', () => {
  it('should apply csx', () => {
    const { getByTestId } = render(
      <Grid data-testid="grid" csx={{ bg: 'azure' }}>
        <Grid.Item data-testid="grid-item" csx={{ bg: 'azure' }} />
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
          <Grid.Item area="row-1" />
          <Grid.Item area="row-2" />
        </Grid>
        <Grid
          templateAreas={['row-1', 'row-2']}
          templateColumns="1fr"
          templateRows="1fr 2fr"
          rowGap="4"
          columnGap="2"
        >
          <Grid.Item area="row-1" />
          <Grid.Item area="row-2" />
        </Grid>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
