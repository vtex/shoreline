import React from 'react'
import { describe, it, expect, render } from '@vtex/shoreline-test-utils'

import {
  ComboboxInput,
  ComboboxProvider,
  ComboboxPopover,
  ComboboxItem,
} from '../index'

describe('primitives/combobox', () => {
  it('renders', () => {
    const { container } = render(
      <ComboboxProvider open>
        <label>
          <ComboboxInput />
        </label>
        <ComboboxPopover>
          <ComboboxItem value="item">Item</ComboboxItem>
        </ComboboxPopover>
      </ComboboxProvider>
    )

    expect(
      container.querySelector('[data-sl-combobox-input]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-combobox-popover]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-combobox-item]')
    ).toBeInTheDocument()
  })
})
