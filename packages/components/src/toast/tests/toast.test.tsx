import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Toast } from '../toast'

describe('toast', () => {
  it('renders', () => {
    const { container } = render(<Toast />)

    expect(container.querySelector('[data-sl-toast]')).toBeInTheDocument()
  })
})
