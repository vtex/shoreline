import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { LinkBox } from '../link-box'

describe('primitives/link-box', () => {
  it('renders', () => {
    const { container } = render(<LinkBox href="">Text</LinkBox>)

    expect(container.querySelector('[data-sl-link-box]')).toBeInTheDocument()
  })
})
