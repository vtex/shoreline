import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { AccessibleIcon } from '../accessible-icon'

describe('primitives/accessible-icon', () => {
  test('renders', () => {
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
