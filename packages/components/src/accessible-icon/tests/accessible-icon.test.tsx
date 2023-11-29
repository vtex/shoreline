import React from 'react'
import { describe, it, expect, render } from '@vtex/shoreline-test-utils'
import { AccessibleIcon } from '../accessible-icon'

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
