import React from 'react'
import { Composable, isComposable } from '../composable'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('composable', () => {
  it('renders', () => {
    const { getByText } = render(<Composable>Compound</Composable>)

    expect(getByText('Compound')).toBeVisible()
  })

  it('renders a diferent element', () => {
    const { getByRole } = render(
      <Composable render={(node) => <button>{node}</button>}>
        Compound
      </Composable>
    )

    expect(getByRole('button')).toHaveTextContent('Compound')
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
