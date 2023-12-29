import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { TimeInput } from '../index'

describe('time-input', () => {
  it('renders', () => {
    const { container } = render(<TimeInput />)

    expect(container.querySelector('[data-sl-time-input]')).toBeInTheDocument()
  })
})
