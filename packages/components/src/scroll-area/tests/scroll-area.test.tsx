import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { ScrollArea } from '../scroll-area'

describe('scroll-area', () => {
  it('renders', () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    )

    expect(container.querySelector('[data-sl-scroll-area]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-scroll-area-viewport]')
    ).toBeInTheDocument()
  })
})
