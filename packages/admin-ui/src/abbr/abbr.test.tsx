import React from 'react'
import { render } from '../test-utils'

import { Abbr } from './abbr'

describe('Abbr', () => {
  it('renders', async () => {
    const { container } = render(<Abbr title="full name">name</Abbr>)

    expect(container).toBeInTheDocument()
  })
})
