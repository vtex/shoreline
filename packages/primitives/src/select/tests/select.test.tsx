import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import {
  SelectTrigger,
  SelectProvider,
  SelectOption,
  SelectPopover,
} from '../index'

describe('primitives/select', () => {
  it('renders', () => {
    const { container } = render(
      <SelectProvider>
        <SelectTrigger>Label</SelectTrigger>
        <SelectPopover>
          <SelectOption value="option">Option</SelectOption>
        </SelectPopover>
      </SelectProvider>
    )

    expect(container.querySelector('[data-sl-select]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-select-popover]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-select-option]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-select-option-check]')
    ).toBeInTheDocument()
  })
})
