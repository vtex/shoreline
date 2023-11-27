import React from 'react'
import { describe, it, expect } from 'vitest'
import { AccessibleIcon } from '../accessible-icon'
import { render } from '@testing-library/react'

describe('accessible-icon', () => {
  it('renders', () => {
    const { container } = render(
      <AccessibleIcon label="label">
        <svg />
      </AccessibleIcon>
    )

    expect(
      container.querySelector('[data-sl-accessible-icon]')
    ).toBeInTheDocument()
  })
})
