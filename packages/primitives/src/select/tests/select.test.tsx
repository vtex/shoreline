import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import {
  SelectTrigger,
  SelectProvider,
  SelectItem,
  SelectPopover,
} from '../index'

describe('primitives/select', () => {
  it('renders', () => {
    const { container } = render(
      <SelectProvider>
        <SelectTrigger>Label</SelectTrigger>
        <SelectPopover>
          <SelectItem value="option">Option</SelectItem>
        </SelectPopover>
      </SelectProvider>
    )

    expect(container.querySelector('[data-sl-select]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-select-popover]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-sl-select-item]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-select-item-check]')
    ).toBeInTheDocument()
  })
})
