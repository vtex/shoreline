import React from 'react'

import { Search } from '../index'
import { render } from '../test-utils'

describe('Search', () => {
  it('renders', async () => {
    const { container } = render(<Search />)

    expect(container).toBeInTheDocument()
  })
})
