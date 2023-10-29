import React from 'react'

import { render } from '../test-utils'
import { Bleed } from './bleed'

describe('Bleed', () => {
  it('renders', async () => {
    const { container } = render(
      <Bleed right="$space-5">
        <button>Button 1</button>
      </Bleed>
    )

    expect(container).toBeInTheDocument()
  })
})
