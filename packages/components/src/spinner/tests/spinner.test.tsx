import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Spinner } from '../spinner'

describe('spinner', () => {
  test('renders', () => {
    const { getByTestId } = render(<Spinner data-testid="spinner" />)

    expect(getByTestId('spinner')).toBeInTheDocument()
  })
})
