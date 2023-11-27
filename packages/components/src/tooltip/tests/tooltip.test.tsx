import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Tooltip } from '../tooltip'

describe('tooltip', () => {
  it('renders', () => {
    const { container } = render(
      <Tooltip text="Text" defaultOpen>
        <button>i</button>
      </Tooltip>
    )

    expect(container.querySelector('[data-sl-tooltip]')).toBeInTheDocument()
  })
})
