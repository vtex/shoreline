import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Divider } from '../divider'

describe('divider', () => {
  test('renders', () => {
    const { container } = render(<Divider />)

    expect(container.querySelector('[data-sl-divider]')).toBeInTheDocument()
  })
})
