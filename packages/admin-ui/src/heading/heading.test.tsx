import React from 'react'
import { render, axe } from '../test-utils'

import { Heading, HeadingLevel } from './index'

describe('Heading tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <HeadingLevel>
        <Heading>Heading 1</Heading>
        <HeadingLevel>
          <Heading>Heading 2</Heading>
          <HeadingLevel>
            <Heading>Heading 3</Heading>
            <HeadingLevel>
              <Heading>Heading 4</Heading>
              <HeadingLevel>
                <Heading>Heading 5</Heading>
                <HeadingLevel>
                  <Heading>Heading 6</Heading>
                </HeadingLevel>
              </HeadingLevel>
            </HeadingLevel>
          </HeadingLevel>
        </HeadingLevel>
      </HeadingLevel>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
