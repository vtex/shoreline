import React from 'react'
import { render } from '@testing-library/react'
import { VisuallyHidden } from '../visually-hidden'
import { describe, it, expect } from 'vitest'

describe('visually-hidden', () => {
  it('renders', () => {
    const { getByText } = render(<VisuallyHidden>Hidden</VisuallyHidden>)

    expect(getByText('Hidden')).toBeVisible()
  })
})
