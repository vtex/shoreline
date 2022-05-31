import React from 'react'

import { render, axe } from '../../../test-utils'
import { Flex } from '../index'

describe('Flex', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Flex>Flex</Flex>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
