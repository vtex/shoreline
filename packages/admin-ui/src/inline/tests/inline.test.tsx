import React from 'react'

import { render, axe } from '../../test-utils'
import { Inline } from '../inline'

describe('Inline', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Inline>
        <button>Button 1</button>
        <button>Button 2</button>
      </Inline>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Inline>
        <button>Button 1</button>
        <button>Button 2</button>
      </Inline>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
