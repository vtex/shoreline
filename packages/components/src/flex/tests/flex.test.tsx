import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Flex } from '../index'

describe('flex', () => {
  test('renders', () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    )

    expect(container.querySelector('[data-sl-flex]')).toBeInTheDocument()
  })
})
