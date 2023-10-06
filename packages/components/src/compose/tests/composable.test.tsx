import React from 'react'
import { Composable, isComposable } from '../composable'
import { render } from '@testing-library/react'

describe('composable', () => {
  it('renders', () => {
    const { getByText } = render(<Composable>Compound</Composable>)

    expect(getByText('Compound')).toBeVisible()
  })

  it('should identify a composable element', () => {
    const nonComposable = <div />

    const composable = (
      <Composable>
        <div />
      </Composable>
    )

    expect(isComposable(nonComposable)).toBeFalsy()
    expect(isComposable(composable)).toBeTruthy()
  })
})
