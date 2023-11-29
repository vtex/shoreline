import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Page } from '../page'

describe('page', () => {
  test('renders', () => {
    const { container } = render(<Page />)

    expect(container.querySelector('[data-sl-page]')).toBeInTheDocument()
  })
})
