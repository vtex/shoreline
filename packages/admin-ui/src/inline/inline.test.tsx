import React from 'react'

import { render } from '../test-utils'
import { Inline } from './inline'

describe('Inline', () => {
  it('renders', async () => {
    const { container } = render(
      <Inline>
        <button>Button 1</button>
        <button>Button 2</button>
      </Inline>
    )

    expect(container).toBeInTheDocument()
  })
})
