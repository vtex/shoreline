import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

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
