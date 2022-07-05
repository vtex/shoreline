import React from 'react'
import { render, axe } from '../../test-utils'

import { Heading } from './index'

describe('Heading tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Heading>Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
