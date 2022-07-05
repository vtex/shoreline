import React from 'react'

import { render, axe } from '../../test-utils'
import { Tooltip } from '../index'

describe('Tooltip tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Tooltip text="label" />
        <Tooltip text="label" visible />
        <Tooltip text="label">
          <button>button with tooltip</button>
        </Tooltip>
        <Tooltip text="label" visible>
          <button>button with tooltip</button>
        </Tooltip>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
