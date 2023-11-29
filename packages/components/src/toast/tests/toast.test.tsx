import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Toast } from '../toast'

describe('toast', () => {
  it('renders', () => {
    const { container } = render(<Toast />)

    expect(container.querySelector('[data-sl-toast]')).toBeInTheDocument()
  })
})
