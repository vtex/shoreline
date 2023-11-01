import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { ScrollArea } from '../scroll-area'

describe('scroll-area', () => {
  test('renders', () => {
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
