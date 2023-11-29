import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Tag } from '../tag'

describe('tag', () => {
  test('renders', () => {
    const { container } = render(<Tag>Text</Tag>)

    expect(container.querySelector('[data-sl-tag]')).toBeInTheDocument()
  })
})
