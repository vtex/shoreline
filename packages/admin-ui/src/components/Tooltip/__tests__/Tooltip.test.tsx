import React from 'react'
import { render, axe } from '../../../test-utils'
import 'mutationobserver-shim'

import { Tooltip } from '../index'

global.MutationObserver = window.MutationObserver

describe('Tooltip tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Tooltip label="label" visible>
        <button>button with tooltip</button>
      </Tooltip>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
