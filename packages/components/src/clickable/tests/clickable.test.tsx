import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Clickable } from '../clickable'

describe('clickable', () => {
  it('renders', () => {
    const { container } = render(<Clickable>clickable</Clickable>)

    expect(container.querySelector('[data-sl-clickable]')).toBeInTheDocument()
  })
})
