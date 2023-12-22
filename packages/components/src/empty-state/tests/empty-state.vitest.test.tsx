import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { EmptyState } from '../empty-state'

describe('empty-state', () => {
  test('renders', () => {
    const { container } = render(<EmptyState />)

    expect(container.querySelector('[data-sl-empty-state]')).toBeInTheDocument()
  })
})
