import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Radio } from '../radio'

describe('radio', () => {
  test('renders', () => {
    const { container } = render(<Radio />)

    expect(container.querySelector('[data-sl-radio]')).toBeInTheDocument()
  })
})
