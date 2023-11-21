import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Toast } from '../toast'

describe('toast', () => {
  test('renders', () => {
    const { container } = render(<Toast />)

    expect(container.querySelector('[data-sl-toast]')).toBeInTheDocument()
  })
})
