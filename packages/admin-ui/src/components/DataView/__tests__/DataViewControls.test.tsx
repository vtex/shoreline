import React from 'react'

import { render, axe, jestMatchMedia } from '../../../test-utils'
import { DataViewControls } from '../components/DataViewControls'

describe('DataViewControls', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <DataViewControls>DataViewControls</DataViewControls>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
