import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Skeleton } from '../skeleton'

describe('skeleton', () => {
  test('renders', () => {
    const { container } = render(<Skeleton />)

    expect(container.querySelector('[data-sl-skeleton]')).toBeInTheDocument()
  })
})
