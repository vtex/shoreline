import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Input } from '../input'

describe('input', () => {
  test('renders', () => {
    const { container } = render(<Input />)

    expect(container.querySelector('[data-sl-input]')).toBeInTheDocument()
  })
})
