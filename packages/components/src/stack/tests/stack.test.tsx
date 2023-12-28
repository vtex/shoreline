import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Stack } from '../index'

describe('stack', () => {
  test('renders', () => {
    const { container } = render(
      <Stack>
        <button>btn 1</button>
        <button>btn 2</button>
        <button>btn 3</button>
      </Stack>
    )

    expect(container.querySelector('[data-sl-stack]')).toBeInTheDocument()
  })
})
