import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Action } from '../action'

describe('action', () => {
  test('renders', () => {
    const { container } = render(<Action>Label</Action>)

    expect(container.querySelector('[data-sl-action]')).toBeInTheDocument()
  })
})
