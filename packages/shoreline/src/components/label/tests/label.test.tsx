import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Label } from '../label'

describe('label', () => {
  test('renders', () => {
    const { container } = render(<Label>Text</Label>)

    expect(container.querySelector('[data-sl-label]')).toBeInTheDocument()
  })
})
