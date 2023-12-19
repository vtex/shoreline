import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Heading } from '../heading'

describe('heading', () => {
  test('renders', () => {
    const { container } = render(<Heading />)

    expect(container.querySelector('[data-sl-heading]')).toBeInTheDocument()
  })
})
