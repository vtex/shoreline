import React from 'react'

import { render, axe } from '../test-utils'
import { Bleed } from './bleed'

describe('Bleed', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Bleed right="$xl">
        <button>Button 1</button>
      </Bleed>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
