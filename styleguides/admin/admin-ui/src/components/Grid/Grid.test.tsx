import React from 'react'
import { render } from '@testing-library/react'

import { Grid } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('Grid tests', () => {
  it('should apply styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Grid data-testid="grid" styles={{ bg: 'azure' }}>
          <Grid.Item data-testid="grid-item" styles={{ bg: 'azure' }} />
        </Grid>
      </ThemeProvider>
    )

    expect(getByTestId('grid')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('grid-item')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
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
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
