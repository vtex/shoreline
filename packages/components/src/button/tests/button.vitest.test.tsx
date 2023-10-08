import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Button } from '../button'

describe('button', () => {
  test('renders', () => {
    const { getByRole } = render(<Button>Text</Button>)

    expect(getByRole('button')).toBeInTheDocument()
  })
})
