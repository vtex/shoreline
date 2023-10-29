import React from 'react'
import { render, jestMatchMedia } from '../../test-utils'

import { Columns, Column } from '../index'

describe('Columns', () => {
  beforeEach(jestMatchMedia)

  it('renders', async () => {
    const { container } = render(
      <Columns space="$space-3">
        <Column units={6}>
          <button>element 1</button>
        </Column>
        <Column units={3}>
          <button>element 2</button>
        </Column>
      </Columns>
    )

    expect(container).toBeInTheDocument()
  })
})
