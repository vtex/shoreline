import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Tooltip } from '../tooltip'

describe('tooltip', () => {
  test('renders', () => {
    const { container } = render(
      <Tooltip text="Text" defaultOpen>
        <button>i</button>
      </Tooltip>
    )

    expect(container.querySelector('[data-sl-tooltip]')).toBeInTheDocument()
  })
})
