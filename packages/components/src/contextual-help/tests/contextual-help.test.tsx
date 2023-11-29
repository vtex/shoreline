import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { ContextualHelp } from '../contextual-help'

describe('contextual-help', () => {
  it('renders', () => {
    const { container } = render(
      <ContextualHelp defaultOpen label="help">
        Help
      </ContextualHelp>
    )

    expect(
      container.querySelector('[data-sl-contextual-help]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-contextual-help-popover]')
    ).toBeInTheDocument()
  })
})
