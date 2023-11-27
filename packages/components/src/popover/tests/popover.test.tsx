import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Popover } from '../popover'
import { PopoverProvider } from '../popover-provider'
import { PopoverTrigger } from '../popover-trigger'

describe('popover', () => {
  it('renders', () => {
    const { container } = render(
      <PopoverProvider>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <Popover>Content</Popover>
      </PopoverProvider>
    )

    expect(container.querySelector('[data-sl-popover]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-popover-trigger]')
    ).toBeInTheDocument()
  })
})
