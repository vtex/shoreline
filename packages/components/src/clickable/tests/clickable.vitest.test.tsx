import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Clickable } from '../clickable'

describe('clickable', () => {
  test('renders', () => {
    const { container } = render(<Clickable>clickable</Clickable>)

    expect(container.querySelector('[data-sl-clickable]')).toBeInTheDocument()
  })
})
