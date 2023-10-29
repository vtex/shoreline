import React from 'react'

import { render } from '../../test-utils'
import { Tooltip } from '../index'

describe('Tooltip tests', () => {
  it('renders', async () => {
    const { container } = render(
      <>
        <Tooltip text="label" />
        <Tooltip text="label" visible />
        <Tooltip text="label">
          <button>button with tooltip</button>
        </Tooltip>
        <Tooltip text="label" visible>
          <button>button with tooltip</button>
        </Tooltip>
      </>
    )

    expect(container).toBeInTheDocument()
  })
})
