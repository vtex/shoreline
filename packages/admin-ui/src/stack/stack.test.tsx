import React from 'react'
import { render, axe, jestMatchMedia } from '../test-utils'

import { Stack } from './index'

describe('Stack', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Stack>
        <button>element 1</button>
        <button>element 2</button>
      </Stack>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
