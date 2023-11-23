import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Header } from '../header'

describe('header', () => {
  test('renders', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('[data-sl-header]')).toBeInTheDocument()
  })
})

