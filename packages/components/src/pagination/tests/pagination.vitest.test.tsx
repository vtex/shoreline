import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Pagination } from '../pagination'

describe('pagination', () => {
  test('renders', () => {
    const { container } = render(<Pagination />)

    expect(container.querySelector('[data-sl-pagination]')).toBeInTheDocument()
  })
})

