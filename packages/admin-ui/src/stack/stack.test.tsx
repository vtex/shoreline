import React from 'react'
import { render, jestMatchMedia } from '../test-utils'

import { Stack } from './index'

describe('Stack', () => {
  beforeEach(jestMatchMedia)

  it('renders', async () => {
    const { container } = render(
      <Stack>
        <button>element 1</button>
        <button>element 2</button>
      </Stack>
    )

    expect(container).toBeInTheDocument()
  })
})
