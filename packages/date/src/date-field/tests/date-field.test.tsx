import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { DateField } from '../date-field'

describe('date-field', () => {
  it('renders', () => {
    const { container } = render(<DateField label="Label" />)

    expect(container.querySelector('[data-sl-date-field]')).toBeInTheDocument()
  })
})
