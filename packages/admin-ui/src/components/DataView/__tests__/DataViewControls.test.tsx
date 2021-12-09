import React from 'react'

import { render, axe, jestMatchMedia } from '../../../test-utils'
import { DataViewControls } from '../components/DataViewControls'

describe('DataViewControls', () => {
  beforeEach(jestMatchMedia)

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <DataViewControls data-testid="data-view-controls" csx={{ bg: 'coral' }}>
        DataViewControls
      </DataViewControls>
    )

    expect(getByTestId('data-view-controls')).toHaveStyleRule(
      'background',
      'coral'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <DataViewControls>DataViewControls</DataViewControls>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot as sticky', () => {
    const { asFragment } = render(
      <DataViewControls sticky>DataViewControls</DataViewControls>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <DataViewControls>DataViewControls</DataViewControls>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
