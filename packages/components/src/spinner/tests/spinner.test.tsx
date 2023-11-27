import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Spinner } from '../spinner'

describe('spinner', () => {
  test('renders', () => {
    const { getByTestId } = render(<Spinner data-testid="spinner" />)

    expect(getByTestId('spinner')).toBeInTheDocument()
  })
})
