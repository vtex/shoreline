import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { DateInput } from '../date-input'

describe('date-input', () => {
  it('renders', () => {
    const { container } = render(<DateInput />)

    expect(container.querySelector('[data-sl-date-input]')).toBeInTheDocument()
  })
})
