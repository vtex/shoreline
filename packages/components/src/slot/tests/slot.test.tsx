import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Slot } from '../slot'

describe('slot', () => {
  test('renders', () => {
    const { container } = render(<Slot />)

    expect(container.querySelector('[data-sl-slot]')).toBeInTheDocument()
  })
})
