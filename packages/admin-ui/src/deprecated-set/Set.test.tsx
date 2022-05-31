import React from 'react'

import { render, axe, jestMatchMedia } from '../test-utils'
import { Set } from './index'

describe('Set tests', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Set>
        <button>element 1</button>
        <button>element 2</button>
      </Set>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
