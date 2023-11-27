import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Skeleton } from '../skeleton'

describe('skeleton', () => {
  test('renders', () => {
    const { container } = render(<Skeleton />)

    expect(container.querySelector('[data-sl-skeleton]')).toBeInTheDocument()
  })
})
