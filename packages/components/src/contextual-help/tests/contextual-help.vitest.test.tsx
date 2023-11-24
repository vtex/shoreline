import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { ContextualHelp } from '../contextual-help'

describe('contextual-help', () => {
  test('renders', () => {
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
