import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Action } from '../action'

describe('action', () => {
  it('renders', () => {
    const { container } = render(<Action>Label</Action>)

    expect(container.querySelector('[data-sl-action]')).toBeInTheDocument()
  })
})
