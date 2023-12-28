import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Center } from '../index'

describe('center', () => {
  test('renders', () => {
    const { container } = render(
      <Center>
        <p>Centered</p>
      </Center>
    )

    expect(container.querySelector('[data-sl-center]')).toBeInTheDocument()
  })
})
