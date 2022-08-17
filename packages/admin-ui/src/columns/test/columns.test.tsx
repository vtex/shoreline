import React from 'react'
import { render, axe, jestMatchMedia } from '../../test-utils'

import { Columns, Column } from '../index'

describe('Columns', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Columns space="$l">
        <Column units={6}>
          <button>element 1</button>
        </Column>
        <Column units={3}>
          <button>element 2</button>
        </Column>
      </Columns>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
