import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { IconButton } from '../icon-button'

describe('icon-button', () => {
  it('renders', () => {
    const { getByRole } = render(
      <IconButton label="Test">
        <div />
      </IconButton>
    )

    expect(getByRole('button')).toBeInTheDocument()
  })
})
