import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Clickable } from '../clickable'

describe('primitives/clickable', () => {
  it('renders', () => {
    const { container } = render(<Clickable>clickable</Clickable>)

    expect(container.querySelector('[data-sl-clickable]')).toBeInTheDocument()
  })
})
