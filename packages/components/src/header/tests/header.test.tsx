import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Header } from '../header'

describe('header', () => {
  test('renders', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('[data-sl-header]')).toBeInTheDocument()
  })
})
