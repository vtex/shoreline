import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { TimeField } from '../time-field'

describe('time-field', () => {
  it('renders', () => {
    const { container } = render(<TimeField label="Label" />)

    expect(container.querySelector('[data-sl-time-field]')).toBeInTheDocument()
  })
})
