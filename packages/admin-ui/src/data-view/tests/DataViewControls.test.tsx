import React from 'react'

import { render, axe, jestMatchMedia } from '../../test-utils'
import { DataViewHeader } from '../components/data-view-header'

describe('DataViewControls', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <DataViewHeader>DataViewControls</DataViewHeader>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
