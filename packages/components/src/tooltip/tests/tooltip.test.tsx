import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Tooltip } from '../tooltip'

describe('tooltip', () => {
  it('renders', () => {
    const { container } = render(
      <Tooltip label="Text" defaultOpen>
        <button>i</button>
      </Tooltip>
    )

    expect(container.querySelector('[data-sl-tooltip]')).toBeInTheDocument()
  })
})
