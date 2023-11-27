import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import {
  Combobox,
  ComboboxProvider,
  ComboboxPopover,
  ComboboxItem,
} from '../index'

describe('combobox', () => {
  it('renders', () => {
    const { container } = render(
      <ComboboxProvider open>
        <label>
          <Combobox />
        </label>
        <ComboboxPopover>
          <ComboboxItem value="item">Item</ComboboxItem>
        </ComboboxPopover>
      </ComboboxProvider>
    )

    expect(container.querySelector('[data-sl-combobox]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-combobox-popover]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-combobox-item]')
    ).toBeInTheDocument()
  })
})
