import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Collections } from '../collections'

describe('collections', () => {
  test('renders', () => {
    const { container } = render(<Collections />)

    expect(container.querySelector('[data-sl-collections]')).toBeInTheDocument()
  })
})

