import React from 'react'
import { describe, it, expect, render } from '@vtex/shoreline-test-utils'

import { Composable, isComposable } from '../composable'

describe('primitives/composable', () => {
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
