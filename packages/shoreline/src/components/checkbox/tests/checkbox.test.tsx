import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Checkbox } from '../checkbox'

describe('checkbox', () => {
  it('renders', () => {
    const { container } = render(<Checkbox>Label</Checkbox>)

    expect(container.querySelector('[data-sl-checkbox]')).toBeInTheDocument()
  })
})
