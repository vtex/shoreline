import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Link } from '../link'

describe('link', () => {
  it('renders', () => {
    const { container } = render(<Link href="https://vtex.com">Label</Link>)

    expect(container.querySelector('[data-sl-link]')).toBeInTheDocument()
  })
})
