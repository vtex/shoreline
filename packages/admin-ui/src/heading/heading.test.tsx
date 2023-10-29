import React from 'react'
import { render } from '../test-utils'

import { Heading, HeadingLevel } from './index'

describe('Heading tests', () => {
  it('renders', async () => {
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

    expect(container).toBeInTheDocument()
  })
})
