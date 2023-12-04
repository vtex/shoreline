import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Popover } from '../popover'
import { PopoverProvider } from '../popover-provider'
import { PopoverTrigger } from '../popover-trigger'

describe('popover', () => {
  it('renders', () => {
    const { container, unmount } = render(
      <PopoverProvider>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <Popover>Content</Popover>
      </PopoverProvider>,
      { container: document.body }
    )

    expect(container.querySelector('[data-sl-popover]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-popover-trigger]')
    ).toBeInTheDocument()

    unmount()
  })
})
