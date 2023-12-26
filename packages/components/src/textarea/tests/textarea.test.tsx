import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Textarea } from '..'

describe('textarea', () => {
  it('renders', () => {
    const { container } = render(<Textarea />)

    expect(container.querySelector('[data-sl-textarea]')).toBeInTheDocument()
  })
})
