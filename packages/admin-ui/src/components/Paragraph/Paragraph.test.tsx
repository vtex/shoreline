import React from 'react'
import { render, axe } from '../../test-utils'

import { Paragraph } from './index'

describe('Paragraph tests', () => {
  it('should not have any violations', async () => {
    const { container } = render(<Paragraph>test paragraph</Paragraph>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
