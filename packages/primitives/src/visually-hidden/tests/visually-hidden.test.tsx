import React from 'react'
import { describe, it, expect, render } from '@vtex/shoreline-test-utils'

import { VisuallyHidden } from '../visually-hidden'

describe('primitives/visually-hidden', () => {
  it('renders', () => {
    const { getByText } = render(<VisuallyHidden>Hidden</VisuallyHidden>)

    expect(getByText('Hidden')).toBeVisible()
  })
})
