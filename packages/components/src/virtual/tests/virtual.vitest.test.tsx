import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Virtual } from '../virtual'

describe('virtual', () => {
  test('renders', () => {
    const { container } = render(<Virtual />)

    expect(container.querySelector('[data-sl-virtual]')).toBeInTheDocument()
  })
})

