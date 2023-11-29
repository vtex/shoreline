import React from 'react'
import { describe, it, render, expect } from '@vtex/shoreline-test-utils'

import { Action } from '../action'

describe('action', () => {
  it('renders', () => {
    const { container } = render(<Action>Label</Action>)

    expect(container.querySelector('[data-sl-action]')).toBeInTheDocument()
  })
})
