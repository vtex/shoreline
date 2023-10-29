import React from 'react'

import { render } from '../../test-utils'
import { Flex } from '../index'

describe('Flex', () => {
  it('renders', async () => {
    const { container } = render(<Flex>Flex</Flex>)

    expect(container).toBeInTheDocument()
  })
})
