import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Bleed } from '../index'

describe('bleed', () => {
  test('renders', () => {
    const { container } = render(
      <Bleed>
        <button>Content</button>
      </Bleed>
    )

    expect(container.querySelector('[data-sl-bleed]')).toBeInTheDocument()
  })
})
