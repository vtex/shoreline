import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Page } from '../page'

describe('page', () => {
  test('renders', () => {
    const { container } = render(<Page />)

    expect(container.querySelector('[data-sl-page]')).toBeInTheDocument()
  })
})

